/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DepartmentDocument = HydratedDocument<Department>;

@Schema()
export class Department {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  entityId: string;

  @Prop({ required: false })
  createdAt: Date;
  
  @Prop({ required: false })
  updatedAt: Date;
}
export const DepartmentSchema = SchemaFactory.createForClass(Department);
