/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  born_date: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true })
  addressId: string;

  @Prop({ required: false })
  id_number: string;

  @Prop({ required: false })
  phone_alt_number: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  createdAt: Date;
  
  @Prop({ required: false })
  updatedAt: Date;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
