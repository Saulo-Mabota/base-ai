/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Stock } from './schema/stock.model.schema';
import { QueryStockDto } from './dto/query-stock.dto';
import { UserModel } from 'src/users/model';
import { CreateManyStockDto } from './dto/create-many-stock.dto';
import { ObjectId } from 'mongodb'; // Importa ObjectId

@Injectable()
export class StockService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Stock.name)
    private stock: Model<Stock>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getStocks(
    user: UserModel,
    options: QueryStockDto = {},
  ) {
    const { role } = user;
    const { skip, take, search } = options;
    const baseWhere: any = {};
    let where = { ...baseWhere };
    if (search) {
      baseWhere.OR = [
        {
          ref: { contains: search },
        },
      ];
    }
    if (role.name !== 'Admin') {
      where = { ...baseWhere, departmentId: new ObjectId(role.departmentId) };
    }
    const total = await this.prisma.stock.count({
      where: where,
    });
    // const products = await this.prisma.departmentHasProduct.findMany({
    //   where: where,
    //   select: { id: true, createdAt: true },
    // });
    const products = await this.prisma.stock.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        isActive: true,
        departmentId: true,
        quantity: true,
        createdAt: true,
        unit_price: true,
        unity_type: true,
        department: true,
      },
    });
    // console.log(products);

    if (!products.length) {
      throw new Error('products not found');
    }
    return { products, total };
  }


  async createStock(
    CreateStockDto: CreateStockDto,
    user: UserModel,
  ) {
    try {
      const { role } = user;
      CreateStockDto.departmentId = role.departmentId;
      if (CreateStockDto.id) {
        const existingProduct =
          await this.prisma.stock.findUnique({
            where: { id: CreateStockDto.id },
          });

        if (existingProduct) {
          const id = new ObjectId(CreateStockDto.id);

          console.log(CreateStockDto);

          const updatedProduct =
            await this.stock.findByIdAndUpdate(
              id, // Passa o ID diretamente
              {
                $set: {
                  ...CreateStockDto,
                  updatedAt: new Date(),
                },
              },
              { new: true }, // Retorna o documento atualizado
            );

          return updatedProduct;
        }
      } else {
        // console.log(CreateStockDto);
        delete CreateStockDto.id;
        const product = await this.stock.create({
          ...CreateStockDto,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        product.id = product._id;
        delete product._id;
        return product;
      }
    } catch (error) {
      throw error;
    }
  }

  async createManyStock(
    CreateManyStockDto: CreateManyStockDto,
  ) {
    const products = CreateManyStockDto.products.map(
      (product) => {
        return {
          ...product,
          quantity: parseInt(product.quantity.toString()),
          unit_price: parseInt(product.unit_price.toString()),
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
    );
    console.log(products);

    try {
      const product = await this.stock.create(products);
      // product.id = product._id;
      // delete product._id;
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteStock(id: string) {
    try {
      if (id) {
        const existingProduct =
          await this.prisma.stock.findUnique({
            where: { id },
          });

        if (existingProduct) {
          const deleteProduct =
            await this.stock.findByIdAndDelete(
              id, // Passa o ID diretamente
            );

          return deleteProduct;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
