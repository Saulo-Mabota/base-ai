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
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  gender: string;

  @Field()
  born_date: string;

  @Field()
  phone_number: string;

  @Field()
  addressId: string;

  @Field({ nullable: true })
  id_number: string;

  @Field({ nullable: true })
  phone_alt_number: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => AddressModel)
  address: AddressModel;
  
  @Field(() => [OrderModel])
  orders: OrderModel[];

}
