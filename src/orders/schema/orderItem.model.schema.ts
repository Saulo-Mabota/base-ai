/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderItemDocument = HydratedDocument<OrderItem>;

@Schema()
export class OrderItem {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  unity_type: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: false })
  createdAt: Date;
  
  @Prop({ required: false })
  updatedAt: Date;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
