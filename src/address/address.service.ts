/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Address } from './schema/address.model.schema';

@Injectable()
export class AddressService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Address.name) private address: Model<Address>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getAddress(id: string) {
    const entity = await this.prisma.address.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        address: true,
      },
    });
    if (!entity) {
      throw new Error('address not found');
    }
    return entity;
  }

  async getAddresss() {
    const address = await this.prisma.address.findMany({
      select: {
        id: true,
        address:true
      },
    });
    if (!address) {
      throw new Error('addresss not found');
    }
    return address;
  }

  async createAddress(createAddressDto: CreateAddressDto) {
    try {
      const address = await this.address.create({
        ...createAddressDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      address.id = address._id;
      delete address._id;
      return address;
    } catch (error) {
      throw error;
    }
  }
}
