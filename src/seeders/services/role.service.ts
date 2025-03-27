/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from 'src/role/dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'src/role/schema/role.model.schema';
import { CreateEntityDto } from 'src/entity/dto';
import { Entity } from 'src/entity/schema/entity.model.schema';
import { CreateDepartmentDto } from 'src/department/dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Role.name) private role: Model<Role>,
    @InjectModel(Entity.name) private entity: Model<Entity>,
    // @InjectModel(DepartmentSeeder.name) private department: Model<DepartmentSeeder>,
  ) {}

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

    return entity;
  }

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
    return role;
  }

  async createRole(createRoleDto: CreateRoleDto, departmentId: string) {
    try {
      const role = await this.role.create({
        ...createRoleDto,
        departmentId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      role.id = role._id;
      return role;
    } catch (error) {
      throw error;
    }
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
  // async createDepartment(createDepartmentDto: CreateDepartmentDto) {
  //   try {
  //     const department = await this.department.create({
  //       ...createDepartmentDto,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     });
  //     department.id = department._id;
  //     return department;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
