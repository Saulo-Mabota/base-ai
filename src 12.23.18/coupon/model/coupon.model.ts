/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Coupon } from '@prisma/client';
import { PaymentModel } from 'src/payment/model';

@ObjectType()
export class CouponModel implements Coupon {
  @Field()
  id: string;

  @Field()
  code: string;

  @Field()
  entityId: string;

  @Field()
  isPercentage: boolean;

  @Field()
  isActive: boolean;
  
  @Field()
  expiryDate: string;

  @Field()
  discount: number;

  @Field()
  minimumOrderAmount: number;

  @Field({ nullable: true })
  description: string;

  @Field(() => [PaymentModel])
  payments: PaymentModel[];

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;


  
}
