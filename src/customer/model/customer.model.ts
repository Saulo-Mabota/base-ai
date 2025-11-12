/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from '@prisma/client';
import { AddressModel } from 'src/address/model';
import { OrderModel } from 'src/orders/model';

@ObjectType()
export class CustomerModel implements Customer {
  @Field()
  id: string;

  @Field()
  entityId: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  gender: string;

  @Field()
  born_date: string;

  @Field()
  phone_number: string;

  @Field({ nullable: true })
  addressId: string;

  @Field({ nullable: true })
  nuit: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  id_number: string;

  @Field({ nullable: true })
  phone_alt_number: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  website: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => AddressModel, { nullable: true })
  address: AddressModel;
  
  @Field(() => [OrderModel])
  orders: OrderModel[];

}
