/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateOrderInput } from './input';
import { OrderService } from './orders.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { UserModel } from 'src/users/model';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateOrderInput } from './input/update-order.input';

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
  async getOrders(@Req() req: Request, @Query() options: QueryUserDto) {
    const user = req.user as UserModel;
    return this.orderService.getOrders(user, options);
  }

  @Get('/invoice')
  @Permissions('list-invoice')
  async getInvoiceOrders(@Req() req: Request, @Query() options: QueryUserDto) {
    const user = req.user as UserModel;
    options.typeOrder = 'invoice';
    return this.orderService.getOrders(user, options);
  }

  @Get('/price')
  @Permissions('list-price')
  async getPriceOrders(@Req() req: Request, @Query() options: QueryUserDto) {
    const user = req.user as UserModel;
    options.typeOrder = 'price';
    return this.orderService.getOrders(user, options);
  }

  @Get('/requisition')
  @Permissions('list-requisition')
  async getRequisitionOrders(
    @Req() req: Request,
    @Query() options: QueryUserDto,
  ) {
    const user = req.user as UserModel;
    options.typeOrder = 'requisition';
    return this.orderService.getOrders(user, options);
  }

  @Post()
  @Permissions('create-order')
  async createOrder(
    @Body() createOrderInput: CreateOrderInput,
    @Req() req: Request,
  ) {
    const user = req.user as UserModel;
    return this.orderService.createOrder(createOrderInput, user);
  }

  @Patch()
  @Permissions('update-order')
  async updateOrder(@Body() updateOrderInput: UpdateOrderInput) {
    return this.orderService.editOrder(updateOrderInput);
  }

  @Delete(':id')
  @Permissions('deletes-order')
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Delete('deletes-order-item/:id')
  @Permissions('delete-order')
  async deleteOrderItem(@Param('id') id: string) {
    return this.orderService.deleteOrderItem(id);
  }
}
