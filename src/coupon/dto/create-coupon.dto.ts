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
export class CreateCouponDto {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  code: string;

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  isPercentage: boolean;

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @Field()
  @IsString()
  @IsNotEmpty()
  expiryDate: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  minimumOrderAmount: number;

  @Field()
  @IsString()
  @IsOptional()
  description: string;
}
