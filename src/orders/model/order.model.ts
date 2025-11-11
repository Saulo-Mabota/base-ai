/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from '@prisma/client';
import { OrderItemModel } from './orderItem.model';

@ObjectType()
export class OrderModel implements Order {
  @Field()
  id: string;

  @Field()
  customerId: string;

  @Field()
  entityId: string;

  @Field()
  departmentId: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  typeOrder: string;

  @Field({ nullable: true })
  status: string;

  @Field()
  ref: string;

  @Field()
  isPayed: boolean;

  @Field()
  total_price: number;

  @Field(() => [OrderItemModel])
  orderItems: OrderItemModel[];

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
