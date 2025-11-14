/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from '@prisma/client';
import { CustomerModel } from 'src/customer/model';

@ObjectType()
export class AddressModel implements Address {
  @Field()
  id: string;

  @Field({ nullable: true })
  pincode: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  state: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  landmark: string;

  @Field({ nullable: true })
  lat: string;

  @Field({ nullable: true })
  long: string;

  @Field()
  save_as: string;

  @Field(() => [CustomerModel])
  customers: CustomerModel[];

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

}
