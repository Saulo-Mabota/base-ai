/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  entityId: string;

  @Prop({ required: true })
  ref: string;

  @Prop({ required: true })
  isPayed: boolean;

  @Prop({ required: true })
  total_price: number;

  @Prop({ required: false })
  createdAt: Date;
  
  @Prop({ required: false })
  updatedAt: Date;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
