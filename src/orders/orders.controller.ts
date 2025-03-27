/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateOrderInput } from './input';
import { OrderService } from './orders.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';

@Controller('order')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  @Permissions('read-order')
  async getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }

  @Get()
  @Permissions('list-order')
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Post()
  @Permissions('create-order')
  async createOrder(@Body() createOrderInput: CreateOrderInput) {
    return this.orderService.createOrder(createOrderInput);
  }
}
