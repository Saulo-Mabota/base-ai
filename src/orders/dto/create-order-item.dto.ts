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
  @IsNotEmpty()
  unity_type: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
