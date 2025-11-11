/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Permission } from 'src/permission/schema/permission.model.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;
  
  @Prop({ required: false })
  departmentId: string;

  @Prop({ required: true })
  createdAt: Date;
  
  @Prop({ required: true })
  updatedAt: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Permission',
    required: false,
  })
  role: Permission[];
}
export const RoleSchema = SchemaFactory.createForClass(Role);
