/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Category } from './schema/category.model.schema';
import { QueryCategoryDto } from './dto/query-category.dto';
import { UserModel } from 'src/users/model';
import { ObjectId } from 'mongodb'; // Importa ObjectId

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Category.name) private category: Model<Category>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getCategory(id: string) {
    const entity = await this.prisma.category.findUnique({
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
      throw new Error('Category not found');
    }
    return entity;
  }


  async getCategories(user: UserModel, options: QueryCategoryDto = {}) {
    const { role } = user;
    const { skip, take, search } = options;
    const baseWhere: any = {};
    let where = { ...baseWhere };
    if (search) {
      baseWhere.OR = [
        {
          roleId: { contains: search },
        },
        {
          name: { contains: search },
        },
      ];
    }
    if (role.name !== 'Admin') {
      where = { ...baseWhere, departmentId:  new ObjectId(role.departmentId) };
    }
    const total = await this.prisma.category.count({ where: where });
    const category = await this.prisma.category.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where:where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        entity:true
      },
    });
    if (!category) {
      throw new Error('Categories not found');
    }
    return {category,total};
  }

  async createCategory(createCategoryDto: CreateCategoryDto, entityId: string) {
    try {
      const category = await this.category.create({
        ...createCategoryDto,
        entityId,
        createdAt:new Date(),
        updatedAt:new Date()
      })
      category.id = category._id
      delete category._id
      return category;
    } catch (error) {
      throw error;
    }
  }
  
}
