/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Payment } from '@prisma/client';
import { CouponModel } from 'src/coupon/model';
import { OrderModel } from 'src/orders/model';

@ObjectType()
export class PaymentModel implements Payment {
  @Field()
  id: string;

  @Field()
  orderId: string;

  @Field({ nullable: true })
  couponId: string;

  @Field()
  entityId: string;

  @Field()
  total_payed: number;

  @Field()
  userId: string;
  
  @Field()
  exchange: number;

  @Field()
  payment_mode: string;

  @Field({ nullable: true })
  transactionRespAPI: string;

  @Field({ nullable: true })
  transaction_id: string;

  @Field(() => OrderModel)
  order: OrderModel;

  @Field(() => CouponModel)
  coupon: CouponModel;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
