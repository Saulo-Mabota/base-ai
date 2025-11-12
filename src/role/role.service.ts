/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/role.model.schema';
import { Permission } from 'src/permission/schema/permission.model.schema';
import { QueryRoleDto } from './dto/query-role.dto';
import { UserModel } from 'src/users/model';
import { use } from 'passport';
import { LabelPermission } from 'src/permission/schema/labelPermission.model.schema';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Role.name) private role: Model<Role>,
    @InjectModel(Permission.name) private permission: Model<Permission>,
    @InjectModel(LabelPermission.name)
    private labelPermission: Model<LabelPermission>,
  ) {}

  async getRolebyName(name: string) {
    const role = await this.prisma.role.findFirst({
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
  async getRoles(user: UserModel, options: QueryRoleDto = {}) {
    const { skip, take, search } = options;
    const { role } = user;
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
      where = { ...baseWhere, departmentId: user.role.departmentId };
    }
    const total = await this.prisma.role.count({ where: baseWhere });
    const Role = await this.prisma.role.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: { ...where },
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

  async createRole(createRoleDto: CreateRoleDto, departmentId: string) {
    try {
      const { permission, ...data } = createRoleDto;
      const role = await this.role.create({
        ...data,
        departmentId,
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
        const permissions = await this.permission.insertMany(permissionData);
        await permissions?.map(async (permission, key) => {
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
      }
      return role;
    } catch (error) {
      throw error;
    }
  }
}
