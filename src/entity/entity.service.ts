/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntityDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Entity } from './schema/entity.model.schema';
import { DiscoveryService } from '@nestjs/core';
import { UserModel } from 'src/users/model';
import { QueryEntityDto } from './dto/query-entity.dto';

@Injectable()
export class EntityService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Entity.name) private entity: Model<Entity>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getEntity(id: string) {
    const entity = await this.prisma.entity.findUnique({
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
      throw new Error('Entity not found');
    }
    return entity;
  }
  async getEntityName(name: string) {
    const entity = await this.prisma.entity.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!entity) {
      throw new Error('Entity not found');
    }
    return entity;
  }

  // async getEntities() {
  //   const permission = await this.prisma.entity.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //       description: true,
  //     },
  //   });
  //   if (!permission) {
  //     throw new Error('Entities not found');
  //   }
  //   return permission;
  // }
  async getEntities(user: UserModel, options: QueryEntityDto = {}) {
    const { role } = user;
    const { skip, take, search } = options;
    const baseWhere: any = {};
    let where = { ...baseWhere };
    if (search) {
      baseWhere.OR = [
        // {
        //   roleId: { contains: search },
        // },
        {
          name: { contains: search },
        },
      ];
    }
    if (role.name !== 'Admin') {
      where = { ...baseWhere, id: user.role.department.entityId };
    }
    const total = await this.prisma.entity.count({ where: where });
    const entity = await this.prisma.entity.findMany({
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
        createdAt: true,
      },
    });
    if (!entity) {
      throw new Error('entitys not found');
    }

    // console.log(entity);
    
    return { entity, total };
  }
  async createEntity(createEntityDto: CreateEntityDto) {
    try {
      const entity = await this.entity.create({
        ...createEntityDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      entity.id = entity._id;
      return entity;
    } catch (error) {
      throw error;
    }
  }
}
