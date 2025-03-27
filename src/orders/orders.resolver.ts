/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateOrderInput } from './input';
import { OrderModel } from './model/order.model';
import { OrderService } from './orders.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => OrderModel)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Permissions('read-order')
  @Query(() => OrderModel, { name: 'order' })
  async getOrder(@Args('id') id: string) {
    return this.orderService.getOrder(id);
  }

  @Permissions('list-order')
  @Query(() => [OrderModel], { name: 'orders', nullable: 'items' })
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Permissions('create-order')
  @Mutation(() => OrderModel)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return this.orderService.createOrder(createOrderInput);
  }
}
