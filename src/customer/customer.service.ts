/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Customer } from './schema/customer.model.schema';
import { UserModel } from 'src/users/model';
import { QueryUserDto } from './dto/query-user.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Customer.name) private customer: Model<Customer>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getCustomer(id: string) {
    const entity = await this.prisma.customer.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });
    if (!entity) {
      throw new Error('customer not found');
    }
    return entity;
  }

  // async getCustomers() {
  //   const customer = await this.prisma.customer.findMany({
  //     select: {
  //       id: true,
  //       firstName: true,
  //       lastName: true,
  //     },
  //   });
  //   if (!customer) {
  //     throw new Error('customers not found');
  //   }
  //   return customer;
  // }

  async getCustomers(user: UserModel, options: QueryUserDto = {}) {
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
      where = { ...baseWhere, entityId: user.role.department.entityId };
    } else {
      where = { ...baseWhere };
    }
    const total = await this.prisma.customer.count({ where: where });
    const customers = await this.prisma.customer.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        type: true,
        phone_alt_number: true,
        phone_number: true,
        nuit: true,
        gender: true,
        location: true,
        born_date: true,
        address: true,
        website: true,
      },
    });
    if (!customers) {
      throw new Error('User not found');
    }
    return { customers, total };
  }

  async createCustomer(user: UserModel, createCustomerDto: CreateCustomerDto) {
    try {
      // console.log(createCustomerDto)
      if (createCustomerDto.id) {
        const existingCustomer = await this.prisma.customer.findUnique({
          where: { id: createCustomerDto.id },
        });

        if (existingCustomer) {
          const id = new ObjectId(createCustomerDto.id);

          // console.log(createCustomerDto);

          const customer = await this.customer.findByIdAndUpdate(
            id, // Passa o ID diretamente
            {
              $set: {
                ...createCustomerDto,
                updatedAt: new Date(),
              },
            },
            { new: true }, // Retorna o documento atualizado
          );

          return customer;
        }
      } else {
        const { role } = user;
        const customer = await this.customer.create({
          ...createCustomerDto,
          entityId:role.department.entityId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        customer.id = customer._id;
        delete customer._id;
        return customer;
      }
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        console.log(error.keyValue);
        if (typeof error.keyValue.email != 'undefined') {
          throw new HttpException(`email already exist`, HttpStatus.FORBIDDEN);
        }
        if (typeof error.keyValue.nuit != 'undefined') {
          throw new HttpException(`nuit already exist`, HttpStatus.FORBIDDEN);
        }
        if (typeof error.keyValue.phone_number != 'undefined') {
          throw new HttpException(
            `phone_number already exist`,
            HttpStatus.FORBIDDEN,
          );
        }
      }
    }
  }

  async deleteCustomer(id: string) {
    try {
      if (id) {
        const existingCustomer = await this.prisma.customer.findUnique({
          where: { id },
        });

        if (existingCustomer) {
          const deleteCustomer = await this.customer.findByIdAndDelete(
            id, // Passa o ID diretamente
          );

          return deleteCustomer;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
