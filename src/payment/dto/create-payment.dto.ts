/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreatePaymentDto {
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
  couponId: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  total_payed: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  payment_mode: string;

  @Field()
  @IsString()
  @IsOptional()
  transactionRespAPI: string;

  @Field()
  @IsString()
  @IsOptional()
  transaction_id: string;
}
