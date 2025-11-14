/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StockHasProductDocument = HydratedDocument<StockHasProduct>;

@Schema()
export class StockHasProduct {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  stockId: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: false })
  unity_type: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}
export const StockHasProductSchema = SchemaFactory.createForClass(StockHasProduct);
