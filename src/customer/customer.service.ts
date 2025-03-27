/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Customer } from './schema/customer.model.schema';

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
        lastName:true,
      },
    });
    if (!entity) {
      throw new Error('customer not found');
    }
    return entity;
  }


  async getCustomers() {
    const customer = await this.prisma.customer.findMany({
      select: {
        id: true,
        firstName: true,
        lastName:true,
      },
    });
    if (!customer) {
      throw new Error('customers not found');
    }
    return customer;
  }

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = await this.customer.create({
        ...createCustomerDto,
        createdAt:new Date(),
        updatedAt:new Date()
      })
      customer.id = customer._id
      delete customer._id
      return customer;
    } catch (error) {
      throw error;
    }
  }
  
}
