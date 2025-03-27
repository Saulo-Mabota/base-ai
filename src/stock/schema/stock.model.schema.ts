/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StockDocument = HydratedDocument<Stock>;

@Schema()
export class Stock {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  departmentId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  unity_type: string;

  @Prop({ required: false })
  unit_price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}
export const StockSchema = SchemaFactory.createForClass(Stock);
