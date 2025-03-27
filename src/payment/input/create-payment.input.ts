/* eslint-disable prettier/prettier */
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
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
  couponId: string;

  @Field()
  @IsNumber()
  @IsOptional()
  total_payed: number;

  @Field()
  @IsString()
  @IsOptional()
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
