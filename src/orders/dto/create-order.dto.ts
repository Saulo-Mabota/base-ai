/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
import { CreateOrderItemInput } from '../input';

@InputType()
export class CreateOrderDto {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  ref: string;
  
  @Field()
  @IsString()
  @IsOptional()
  typeOrder: string;

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  isPayed: boolean;

  @Field(() => [CreateOrderItemDto])
  @IsArray()
  @IsOptional()
  orderItems: CreateOrderItemDto[];
}
