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
  @IsBoolean()
  @IsOptional()
  isPayed: boolean;

  @Field()
  @IsNumber()
  @IsOptional()
  total_price: number;

  @Field(() => [CreateOrderItemInput])
  @IsArray()
  @IsOptional()
  orderItems: CreateOrderItemInput[];
}
