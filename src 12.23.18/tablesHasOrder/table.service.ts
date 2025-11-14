/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTableDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './schema/table.model.schema';
import { Permission } from 'src/permission/schema/permission.model.schema';
import { QueryTableDto } from './dto/query-table.dto';

@Injectable()
export class TableService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Table.name) private table: Model<Table>,
  ) {}

  async getTable(id: string) {
    const table = await this.prisma.table.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!table) {
      throw new Error('table not found');
    }
    return table;
  }
  async getTables(entityId: string, options: QueryTableDto = {}) {
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
    const total = await this.prisma.table.count({ where: baseWhere });
    const table = await this.prisma.table.findMany({
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
        customers: true,
      },
    });
    if (!table) {
      throw new Error('Tables not found');
    }
    return { total, table };
  }

  async createTable(createRoleDto: CreateTableDto, entityId: string) {
    try {
      const { id, ...data } = createRoleDto;
      if (!id) {
        const table = await this.table.create({
          ...data,
          entityId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
         return table;
      } else {
        const existingTable = await this.prisma.table.findUnique({
          where: { id },
        });
        if(existingTable){
           const updatedTable = await this.table.findByIdAndUpdate(
            id, // Passa o ID diretamente
            {
              $set: {
                ...data,
              },
            },
            { new: true }, // Retorna o documento atualizado
          );
          return updatedTable
        }
      }
     
    } catch (error) {
      throw error;
    }
  }
}
