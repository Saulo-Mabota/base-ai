/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/role.model.schema';
import { Permission, } from 'src/permission/schema/permission.model.schema';
import { QueryRoleDto } from './dto/query-role.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Role.name) private role: Model<Role>,
    @InjectModel(Permission.name) private permission: Model<Permission>,
  ) {}

  async getRolebyName(name: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  }
  async getRole(id: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  }
  async getRoles(entityId: string, options: QueryRoleDto = {}) {
    const { skip, take, search } = options;
    const baseWhere: any = {};
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
    const total = await this.prisma.role.count({ where: baseWhere });
    const Role = await this.prisma.role.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: { ...baseWhere },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        permissions: {
          select: {
            id: true,
            name: true,
            description: true,
            roleId: true,
            isMenu: true,
            label: {
              select: {
                id: true,
                lang: true,
                title: true,
                icon: true,
                link: true,
                description: true,
                isHeadr: true,
                position: true,
              },
            },
          },
        },
      },
    });
    if (!Role) {
      throw new Error('User not found');
    }
    return { total, Role };
  }

  async createRole(createRoleDto: CreateRoleDto, entityId: string) {
    try {
      const { permission, ...data } = createRoleDto;
      const role = await this.role.create({
        ...data,
        entityId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (permission && permission.length) {
        const permissionData = [];
        permission.forEach(async (item) => {
          role.id = role._id;
          permissionData.push({
            roleId: role.id,
            description: role.description,
            isMenu: false,
            name: item.label,
            position: item.value,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
        await this.permission.insertMany(permissionData);
      }
      return role;
    } catch (error) {
      throw error;
    }
  }
}
