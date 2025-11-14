/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockHasProductDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { StockHasProduct } from './schema/stockHasProduct.model.schema';
import { QueryStockDto } from './dto/query-stock.dto';
import { UserModel } from 'src/users/model';
import { CreateManyStockHasProductDto } from './dto/create-many-stock-has-product.dto';
import { ObjectId } from 'mongodb'; // Importa ObjectId

@Injectable()
export class StockHasProductService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(StockHasProduct.name)
    private stockHasProduct: Model<StockHasProduct>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getStockHasProducts(
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
      where = { ...baseWhere };
    }
    const total = await this.prisma.stockHasProduct.count({
      where: where,
    });
    // const products = await this.prisma.departmentHasProduct.findMany({
    //   where: where,
    //   select: { id: true, createdAt: true },
    // });
    const products = await this.prisma.stockHasProduct.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        quantity: true,
        createdAt: true,
        unity_type: true,
        product: true,
      },
    });
    // console.log(products);

    if (!products.length) {
      throw new Error('products not found');
    }
    return { products, total };
  }


  async createStockHasProduct(
    createStockHasProductDto: CreateStockHasProductDto
    // user: UserModel,
  ) {
    try {
      // const { role } = user;
      
      if (createStockHasProductDto.id) {
        const existingProduct =
          await this.prisma.stockHasProduct.findUnique({
            where: { id: createStockHasProductDto.id },
          });

        if (existingProduct) {
          const id = new ObjectId(createStockHasProductDto.id);

          console.log(createStockHasProductDto);

          const updatedProduct =
            await this.stockHasProduct.findByIdAndUpdate(
              id, // Passa o ID diretamente
              {
                $set: {
                  ...createStockHasProductDto,
                  updatedAt: new Date(),
                },
              },
              { new: true }, // Retorna o documento atualizado
            );

          return updatedProduct;
        }
      } else {
        // console.log(createStockHasProductDto);
        delete createStockHasProductDto.id;
        const product = await this.stockHasProduct.create({
          ...createStockHasProductDto,
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

  async createManyStockHasProduct(
    createManyStockHasProductDto: CreateManyStockHasProductDto
  ) {
    const products = createManyStockHasProductDto.products.map(
      (product) => {
        return {
          ...product,
          quantity: parseInt(product.quantity.toString()),
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
    );
    console.log(products);

    try {
      const product = await this.stockHasProduct.create(products);
      // product.id = product._id;
      // delete product._id;
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteStockHasProduct(id: string) {
    try {
      if (id) {
        const existingProduct =
          await this.prisma.stockHasProduct.findUnique({
            where: { id },
          });

        if (existingProduct) {
          const deleteProduct =
            await this.stockHasProduct.findByIdAndDelete(
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
