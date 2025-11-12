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
export class CreateStockDto {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsOptional()
  action: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  departmentId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @Field()
  @IsString()
  @IsOptional()
  stockId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsString()
  @IsOptional()
  unity_type: string;

  @Field()
  @IsString()
  @IsOptional()
  brand: string;

  @Field()
  @IsNumber()
  @IsOptional()
  min_quantity: number;

  @Field()
  @IsNumber()
  @IsOptional()
  unit_price: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Field()
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
