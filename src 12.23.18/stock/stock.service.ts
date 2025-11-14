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
import { equals } from 'class-validator';

@Injectable()
export class StockService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Stock.name)
    private stock: Model<Stock>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getStocks(user: UserModel, options: QueryStockDto = {}) {
    const { role } = user;
    const { skip, take, search, categoryId, isStockId } = options;
    const baseWhere: any = {
      stockId: {
        isSet: `${isStockId}` === 'true' ? true : false,
      },
    };
    // console.log({ isStockId });

    let where = {
      ...baseWhere,
    };
    if (search) {
      baseWhere.OR = [
        {
          name: { contains: search, mode: 'insensitive' },
        },
      ];
    }
    if (categoryId) {
      // console.log(categoryId);

      baseWhere.OR = [
        {
          categoryId: { equals: categoryId },
        },
      ];
    }
    if (role.name !== 'Admin') {
      where = { ...baseWhere, departmentId: new ObjectId(role.departmentId) };
    } else {
      where = { ...baseWhere };
    }

    // console.log(where.OR);

    const total = await this.prisma.stock.count({
      where: where,
    });

    const products = await this.prisma.stock.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: {
        ...where,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        isActive: true,
        departmentId: true,
        categoryId: true,
        quantity: true,
        min_quantity: true,
        brand: true,
        createdAt: true,
        unit_price: true,
        unity_type: true,
        department: true,
        action: true,
        description: true,
        stockId: true,
        user: {
          select: {
            id: true,
            username: true,
            picture: true,
          },
        },
        request: {
          skip: skip ? parseInt(skip) : undefined,
          take: take ? parseInt(take) : undefined,
          include: {
            product: true,
            stock: true,
            department: true,
          },
        },
        category: true,
      },
    });

    // console.log(products);

    if (!products.length) {
      throw new Error('products not found');
    }
    return { products, total };
  }

  async createStock(CreateStockDto: CreateStockDto, user: UserModel) {
    try {
      const { role, id } = user;
      CreateStockDto.departmentId = role.departmentId;
      // console.log(CreateStockDto);

      if (CreateStockDto.id) {
        const existingProduct = await this.prisma.stock.findUnique({
          where: { id: CreateStockDto.id },
        });

        if (existingProduct) {
          const id = new ObjectId(CreateStockDto.id);
          let result = existingProduct.quantity;
          if (CreateStockDto.action === 'Added') {
            result = existingProduct.quantity + CreateStockDto.quantity;
          }
          if (CreateStockDto.action === 'Removed') {
            result = existingProduct.quantity - CreateStockDto.quantity;
          }
          if (CreateStockDto.action === 'Transferred') {
            result = existingProduct.quantity - CreateStockDto.quantity;
          }
          const updatedProduct = await this.stock.findByIdAndUpdate(
            id, // Passa o ID diretamente
            {
              $set: {
                // ...CreateStockDto,
                quantity: result,
                userId: id,
                isActive: result ? true : false,
                isAvailable: result ? true : false,
                updatedAt: new Date(),
              },
            },
            { new: true }, // Retorna o documento atualizado
          );
          if (!CreateStockDto.stockId) {
            return updatedProduct;
          }
        }
      }

      if (CreateStockDto.stockId) {
        // console.log(CreateStockDto);
        delete CreateStockDto.id;
        const product = await this.stock.create({
          ...CreateStockDto,
          userId: id,
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
    user: UserModel,
  ) {
    const products = CreateManyStockDto.products.map((product) => {
      return {
        ...product,
        quantity: parseInt(product.quantity.toString()),
        unit_price: parseInt(product.unit_price.toString()),
        userId: user.id,
        isActive: true,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    // console.log(products);
    try {
      const product = await this.stock.create(products);
      // product.id = product._id;
      // delete product._id;
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateStock(createStockDto: CreateStockDto, user: UserModel) {
    try {
      const { id, ...data } = createStockDto;
      if (id) {
        const existingProduct = await this.prisma.stock.findUnique({
          where: { id },
        });

        if (existingProduct) {
          const updatedProduct = await this.stock.findByIdAndUpdate(
            id, // Passa o ID diretamente
            {
              $set: {
                ...data,
                userId: user.id,
                updatedAt: new Date(),
              },
            },
            { new: true }, // Retorna o documento atualizado
          );
          return updatedProduct;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteStock(id: string) {
    try {
      if (id) {
        const existingProduct = await this.prisma.stock.findUnique({
          where: { id },
        });

        if (existingProduct) {
          const deleteProduct = await this.stock.findByIdAndDelete(
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
