/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LabelPermissionDocument = HydratedDocument<LabelPermission>;

@Schema()
export class LabelPermission {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  lang: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  icon: string;

  @Prop({ required: false })
  link: string;

  @Prop({ required: false })
  isHeadr: boolean;

  @Prop({ required: false })
  position: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  permissionId: string;

  @Prop({ required: true })
  createdAt: Date;
  
  @Prop({ required: true })
  updatedAt: Date;
}
export const LabelPermissionSchema = SchemaFactory.createForClass(LabelPermission);
