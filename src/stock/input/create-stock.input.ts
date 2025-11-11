/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStockInput {
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
  @IsOptional()
  brand: string;

  @Field()
  @IsNumber()
  @IsOptional()
  min_quantity: number;

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
