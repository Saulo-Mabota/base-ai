/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto } from 'src/department/dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Department } from 'src/department/schema/department.model.schema';
import { UserModel } from 'src/users/model';
import { QueryDepartmentDto } from 'src/department/dto/query-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Department.name) private department: Model<Department>,
  ) {}

  async getDepartment(id: string) {
    const Department = await this.prisma.department.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        entity:true,
        entityId:true
      },
    });
    if (!Department) {
      throw new Error('Department not found');
    }
    return Department;
  }

  async getDepartments(user: UserModel, options: QueryDepartmentDto = {}) {
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
      where = { ...baseWhere, entityId: user.entityId };
    }
    const total = await this.prisma.department.count({ where: where });
    const department = await this.prisma.department.findMany({
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
        entity:true,
        entityId:true
      },
    });
    if (!department) {
      throw new Error('Departments not found');
    }
    return {department,total};
  }

  async createDepartment(entityId:string,createDepartmentDto: CreateDepartmentDto) {
    try {
      const department = await this.department.create({
        entityId,
        ...createDepartmentDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      department.id = department._id;
      return department;
    } catch (error) {
      throw error;
    }
  }
}
