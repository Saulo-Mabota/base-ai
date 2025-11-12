/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  cover: string;

  @Prop({ required: false })
  price: number;

  @Prop({ required: false })
  quantity: number;

  @Prop({ required: true })
  subCategoryId: string;

  @Prop({ required: true })
  entityId: string;

  @Prop({ required: false })
  createdAt: Date;
  
  @Prop({ required: false })
  updatedAt: Date;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
