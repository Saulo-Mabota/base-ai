/* eslint-disable prettier/prettier */
import {
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

@InputType()
export class CreateOrderItemInput {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsOptional()
  orderId: string;

  @Field()
  @IsString()
  @IsOptional()
  productId: string;

  @Field()
  @IsString()
  @IsOptional()
  unity_type: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;

  @Field()
  @IsNumber()
  @IsOptional()
  quantity: number;

  @Field()
  @IsNumber()
  @IsOptional()
  unit_price: number;
}
