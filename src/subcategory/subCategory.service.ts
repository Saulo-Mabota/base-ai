/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubCategoryDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { SubCategory } from './schema/subCategory.model.schema';
import { QuerySubCategoryDto } from './dto/query-sub-category.dto';
import { UserModel } from 'src/users/model';
import { ObjectId } from 'mongodb'; // Importa ObjectId

@Injectable()
export class SubCategoryService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(SubCategory.name) private subCategory: Model<SubCategory>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getSubCategory(id: string) {
    const entity = await this.prisma.subCategory.findUnique({
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

  async getSubCategories(user: UserModel, options: QuerySubCategoryDto = {}) {
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
    const total = await this.prisma.subCategory.count({ where: where });
    const subCategory = await this.prisma.subCategory.findMany({
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
        category: true,
        products: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!subCategory) {
      throw new Error('Categories not found');
    }
    return { subCategory, total };
  }

  // async createSubCategory(
  //   createSubCategoryDto: CreateSubCategoryDto,
  //   entityId: string,
  // ) {
  //   try {
  //     const subCategory = await this.subCategory.create({
  //       ...createSubCategoryDto,
  //       entityId,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     });
  //     subCategory.id = subCategory._id;
  //     delete subCategory._id;
  //     return subCategory;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async createOrUpdateSubCategory(
    createSubCategoryDto: CreateSubCategoryDto,
    entityId: string,
  ) {
    try {
      if (createSubCategoryDto.id) {
        // Verifica se a subcategoria já existe
        const existingSubCategory = await this.prisma.subCategory.findUnique({
          where: { id: createSubCategoryDto.id },
        });

        if (existingSubCategory) {
          const id = new ObjectId(createSubCategoryDto.id);
          // Atualiza a subcategoria existente
          // console.log('createSubCategoryDto', createSubCategoryDto);

          const updatedSubCategory = await this.subCategory.findByIdAndUpdate(
            id, // Passa o ID diretamente
            {
              $set: {
                ...createSubCategoryDto,
                entityId,
                updatedAt: new Date(),
              },
            },
            { new: true }, // Retorna o documento atualizado
          );

          return updatedSubCategory;
        }
      }

      // Cria uma nova subcategoria se não houver ID ou não existir no banco
      const subCategory = await this.subCategory.create({
        ...createSubCategoryDto,
        entityId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      subCategory.id = subCategory._id;
      delete subCategory._id;
      return subCategory;
    } catch (error) {
      throw error;
    }
  }
  async deleteSubcategory(id: string) {
    try {
      if (id) {
        // Verifica se a subcategoria existe
        const existingSubCategory = await this.prisma.subCategory.findUnique({
          where: { id },
        });

        if (existingSubCategory) {
          const deleteSubCategory = await this.subCategory.findByIdAndDelete(
            id, // Passa o ID diretamente
          );

          return deleteSubCategory;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
