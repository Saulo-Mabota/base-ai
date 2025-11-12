/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: false })
  couponId: string;

  @Prop({ required: true })
  entityId: string;

  @Prop({ required: true })
  total_payed: number;

  @Prop({ required: true })
  exchange: number;

  @Prop({ required: true })
  payment_mode: string;

  @Prop({ required: false })
  transactionRespAPI: string;

  @Prop({ required: false })
  transaction_id: string;

  @Prop({ required: false })
  createdAt: Date;
  
  @Prop({ required: false })
  updatedAt: Date;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
