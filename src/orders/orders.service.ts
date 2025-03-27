/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Order } from './schema/order.model.schema';
import { OrderItem } from './schema/orderItem.model.schema';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Order.name) private order: Model<Order>,
    @InjectModel(OrderItem.name) private orderItem: Model<OrderItem>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getOrder(id: string) {
    const entity = await this.prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        isPayed: true,
      },
    });
    if (!entity) {
      throw new Error('order not found');
    }
    return entity;
  }

  async getOrders() {
    const order = await this.prisma.order.findMany({
      select: {
        id: true,
        isPayed: true,
      },
    });
    if (!order) {
      throw new Error('orders not found');
    }
    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.order.create({
        customerId:createOrderDto.customerId,
        isPayed:createOrderDto.isPayed,
        ref:createOrderDto.ref,
        total_price:createOrderDto.total_price,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      order.id = order._id;
      const createOrderItemDto = createOrderDto.orderItems.map((item) => {
        productId: item.productId;
        quantity: item.quantity;
        unity_type: item.unity_type;
        orderId: order.id;
      });
      await this.orderItem.insertMany(createOrderItemDto);
      delete order._id;
      return order;
    } catch (error) {
      throw error;
    }
  }
}
