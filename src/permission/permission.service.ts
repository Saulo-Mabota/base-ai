/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto, CreateOrUpdatePermissionDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schema/permission.model.schema';
import { LabelPermission } from './schema/labelPermission.model.schema';
import { DiscoveryService } from '@nestjs/core';
import { PermissionModel } from './model';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { tr } from 'date-fns/locale';
import { equals } from 'class-validator';
import { match } from 'assert';

@Injectable()
export class PermissionService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Permission.name) private permission: Model<Permission>,
    @InjectModel(LabelPermission.name)
    private labelPermission: Model<LabelPermission>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getPermission(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        // role: {
        //   select: {
        //     id: true,
        //     name: true,
        //   },
        // },
      },
    });
    if (!permission) {
      throw new Error('Permission not found');
    }
    return permission;
  }

  async getAdminRole() {
    const role = await this.prisma.role.findFirst({
      where: {
        name: 'Admin',
      },
      select: {
        id: true,
      },
    });
    return role;
  }
  async getPermissions(options: QueryPermissionDto = {}) {
    const { skip, take, search, menu } = options;
    let baseWhere: any = {};
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

    if (`${menu}` === 'true') {
      baseWhere = { ...baseWhere, isMenu: true };
    }

    const total = await this.prisma.permission.count({ where: baseWhere });

    const permissions = await this.prisma.permission.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: baseWhere,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        label: true,
        role: true,
      },
    });
    // if (!permissions) {
    //   throw new Error('User not found');
    // }
    return { total, permissions };
  }

  async getSyncPemissions() {
    const controllers = this.discoveryService.getControllers();

    const permissions = ['read', 'list', 'create', 'update', 'delete'];

    const entities = controllers.map((wrapper) =>
      wrapper.metatype.name.split('Controller')[0].toLowerCase(),
    );

    const role = await this.getAdminRole();
    if (role) {
      const newPermitions = [];
      entities.forEach((entity, key) => {
        permissions.forEach((permission) => {
          newPermitions.push({
            name: `${permission}-${entity}`,
            description: 'For admin',
            isMenu: false,
            roleId: role.id,
            position: key,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });
      return { newPermitions, role };
    }
  }

  async syncPermissions() {
    try {
      const adminPermissions = await this.getSyncPemissions();
      if (adminPermissions.role) {
        await this.permission.deleteMany({
          roleId: adminPermissions.role.id,
        });
        await this.labelPermission.deleteMany();

        const permissions = await this.permission.insertMany(
          adminPermissions.newPermitions,
        );

        await permissions.map(async (permission, key) => {
          permission.id = permission._id;
          await this.labelPermission.create({
            permissionId: permission.id,
            description: 'Menu description',
            lang: 'pt',
            title: permission.name,
            link: permission.name,
            isHeadr: false,
            position: key,
            icon: 'heroicons:home-solid',
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          return permission;
        });

        return this.permission.find();
      }
    } catch (error) {
      throw error;
    }
  }

  async createPermission(
    createOrUpdatePermissionDto: CreateOrUpdatePermissionDto,
  ) {
    try {
      const { id, ...data } = createOrUpdatePermissionDto;
      if (id) {
        return this.labelPermission.findByIdAndUpdate(id, {
          ...data,
        });
      } else {
        return this.labelPermission.create({
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      throw error;
    }
  }
  async updatePermission(id: string, createPermissionDto: CreatePermissionDto) {
    try {
      const permission = await this.permission.findByIdAndUpdate(id, {
        ...createPermissionDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return permission;
    } catch (error) {
      throw error;
    }
  }

  async allPermition() {
    const adminPermissions = await this.getSyncPemissions();
    return adminPermissions.newPermitions
  }
}
