/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { OrderItem } from '@prisma/client';
import { ProductModel } from 'src/product/model';

@ObjectType()
export class OrderItemModel implements OrderItem {
  @Field()
  id: string;

  @Field()
  orderId: string;

  @Field()
  productId: string;

  @Field({ nullable: true })
  unity_type: string;

  @Field()
  quantity: number;

  @Field({ nullable: true })
  unit_price: number;

  @Field({ nullable: true })
  description: string;

  @Field(() => ProductModel,{ nullable: true })
  product: ProductModel;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
