/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Product } from './schema/product.model.schema';
import { QueryProductDto } from './dto/query-product.dto';
import { UserModel } from 'src/users/model';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Product.name) private product: Model<Product>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getProduct(id: string) {
    const entity = await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!entity) {
      throw new Error('product not found');
    }
    return entity;
  }


  async getProducts(user: UserModel, options: QueryProductDto = {}) {
    const { role } = user;
    const { skip, take, search } = options;
    const baseWhere: any = {};
    let where = { ...baseWhere };
    if (search) {
      baseWhere.OR = [
        {
          categoryId: { contains: search },
        },
        {
          name: { contains: search },
        },
      ];
    }
    if (role.name !== 'Admin') {
      where = { ...baseWhere, entityId: user.entityId };
    }
    const total = await this.prisma.product.count({ where: where });
    const product = await this.prisma.product.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        subCategory:true,
      },
    });
    if (!product) {
      throw new Error('products not found');
    }
    return {product,total};
  }

  async createProduct(createProductDto: CreateProductDto,entityId: string,) {
    try {
      const product = await this.product.create({
        ...createProductDto,
        entityId,
        createdAt:new Date(),
        updatedAt:new Date()
      })
      product.id = product._id
      delete product._id
      return product;
    } catch (error) {
      throw error;
    }
  }
  
}
