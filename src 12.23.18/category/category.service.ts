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
    const { skip, take, search, type } = options;
    const baseWhere: any = {};
    let where = { ...baseWhere };
    if (search) {
      baseWhere.OR = [
        {
          name: { contains: search },
        },
        {
          type: { contains: type },
        },
      ];
    }
    if (role.name !== 'Admin') {
      where = { ...baseWhere, entityId: user.role.department.entityId }; // Use ObjectId for entityId
    } else {
      where = { ...baseWhere };
    }
    const total = await this.prisma.category.count({ where: where });
    const category = await this.prisma.category.findMany({
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
        type: true,
        entity: {
          select: {
            id: true,
            name: true,
          },
        },
        departmentId: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        stock: {
          select: {
            id: true,
            name: true,
            stockId: true,
            quantity: true,
            min_quantity: true,
          },
        },
      },
    });
    if (!category) {
      throw new Error('Categories not found');
    }
    return { category, total };
  }

  async createCategory(createCategoryDto: CreateCategoryDto, entityId: string) {
    try {
      if (createCategoryDto.id) {
        const existingCategory = await this.prisma.category.findUnique({
          where: { id: createCategoryDto.id },
        });

        if (existingCategory) {
          const id = new ObjectId(createCategoryDto.id);
          const updatedCategory = await this.category.findByIdAndUpdate(
            id, // Passa o ID diretamente
            {
              $set: {
                ...createCategoryDto,
                updatedAt: new Date(),
              },
            },
            { new: true }, // Retorna o documento atualizado
          );
          return updatedCategory;
        }
      } else {
        // console.log(createCategoryDto);

        const category = await this.category.create({
          ...createCategoryDto,
          entityId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        category.id = category._id;
        delete category._id;
        return category;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: string) {
    try {
      if (id) {
        const existingCategory = await this.prisma.category.findUnique({
          where: { id },
        });

        if (existingCategory) {
          const deleteCategory = await this.category.findByIdAndDelete(
            id, // Passa o ID diretamente
          );

          return deleteCategory;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
