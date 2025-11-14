/* eslint-disable prettier/prettier */
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCouponInput {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsOptional()
  code: string;

  @Field()
  @IsBoolean()
  @IsOptional()
  isPercentage: boolean;

  @Field()
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @Field()
  @IsString()
  @IsOptional()
  expiryDate: string;

  @Field()
  @IsNumber()
  @IsOptional()
  discount: number;

  @Field()
  @IsNumber()
  @IsOptional()
  minimumOrderAmount: number;

  @Field()
  @IsString()
  @IsOptional()
  description: string;

}
