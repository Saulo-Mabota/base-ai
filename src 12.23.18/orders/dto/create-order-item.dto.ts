/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateOrderItemDto {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  quantity: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  unit_price: number;
}
