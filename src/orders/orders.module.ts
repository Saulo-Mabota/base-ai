/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { JwtModule } from '@nestjs/jwt';
import { OrderResolver } from './orders.resolver';
import { OrderSchema, Order, } from './schema/order.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';
import { OrderItem, OrderItemSchema } from './schema/orderItem.model.schema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: OrderItem.name, schema: OrderItemSchema }]),
    DiscoveryModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
