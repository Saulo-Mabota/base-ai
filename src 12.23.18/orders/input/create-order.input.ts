/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { CreateOrderItemInput } from './create-order-item.input';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsOptional()
  customerId: string;

  @Field()
  @IsString()
  @IsOptional()
  ref: string;

  @Field()
  @IsString()
  @IsOptional()
  typeOrder: string;

  @Field()
  @IsBoolean()
  @IsOptional()
  isPayed: boolean;

  @Field(() => [CreateOrderItemInput])
  @IsArray()
  @IsOptional()
  orderItems: CreateOrderItemInput[];
}
