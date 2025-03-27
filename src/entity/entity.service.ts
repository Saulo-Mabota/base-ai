import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntityDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Entity } from './schema/entity.model.schema';
import { DiscoveryService } from '@nestjs/core';

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

  async getEntities() {
    const permission = await this.prisma.entity.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!permission) {
      throw new Error('Entities not found');
    }
    return permission;
  }

  async createEntity(createEntityDto: CreateEntityDto) {
    try {
      const entity = await this.entity.create({
        ...createEntityDto,
      });
      entity.id = entity._id;
      return entity;
    } catch (error) {
      throw error;
    }
  }
}
