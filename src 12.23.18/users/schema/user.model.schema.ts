/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Role } from 'src/role/schema/role.model.schema';

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  username: string;
  
  @Prop({ required: false })
  picture: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role', required: true })
  roleId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role', required: false })
  role: Role;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Entity', required: true })
  entityId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Entity', required: false })
  entity: Role;
  
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: true })
  updatedAt: Date;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
