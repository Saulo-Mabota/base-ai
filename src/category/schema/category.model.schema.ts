/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  type: string;
  
  @Prop({ required: false })
  entityId: string;

  @Prop({ required: false })
  departmentId: string;

  @Prop({ required: false })
  createdAt: Date;
  
  @Prop({ required: false })
  updatedAt: Date;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
