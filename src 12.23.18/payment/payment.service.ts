/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Payment } from './schema/payment.model.schema';
import { UserModel } from 'src/users/model';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Payment.name) private payment: Model<Payment>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getPayment(id: string) {
    const entity = await this.prisma.payment.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        payment_mode:true
      },
    });
    if (!entity) {
      throw new Error('payment not found');
    }
    return entity;
  }


  async getPayments() {
    const payment = await this.prisma.payment.findMany({
      select: {
        id: true,
        payment_mode:true
      },
    });
    if (!payment) {
      throw new Error('payments not found');
    }
    return payment;
  }

  async createPayment(createPaymentDto: CreatePaymentDto,user: UserModel) {
    try {
      const payment = await this.payment.create({
        ...createPaymentDto,
        userId: user.id,
        entityId: user.entityId,
        createdAt:new Date(),
        updatedAt:new Date()
      })
      payment.id = payment._id
      delete payment._id
      return payment;
    } catch (error) {
      throw error;
    }
  }
  
}
