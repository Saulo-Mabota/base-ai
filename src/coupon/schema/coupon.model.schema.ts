/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CouponDocument = HydratedDocument<Coupon>;

@Schema()
export class Coupon {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  entityId: string;

  @Prop({ required: true })
  isPercentage: boolean;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  expiryDate: string;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  minimumOrderAmount: number;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  createdAt: Date;
  
  @Prop({ required: false })
  updatedAt: Date;
}
export const CouponSchema = SchemaFactory.createForClass(Coupon);
