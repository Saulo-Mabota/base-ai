/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop({ required: false })
  id: string;

  @Prop({ required: false })
  pincode: string;

  @Prop({ required: false })
  address: string;
  
  @Prop({ required: false })
  city: string;
  
  @Prop({ required: false })
  state: string;
  
  @Prop({ required: false })
  country: string;
  
  @Prop({ required: false })
  landmark: string;
  
  @Prop({ required: false })
  lat: string;
  
  @Prop({ required: false })
  long: string;
  
  @Prop({ required: false })
  save_as: string;

  @Prop({ required: false })
  createdAt: Date;
  
  @Prop({ required: false })
  updatedAt: Date;
}
export const AddressSchema = SchemaFactory.createForClass(Address);
