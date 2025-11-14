/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStockHasProductInput {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  stockId: string;

  @Field()
  @IsString()
  @IsOptional()
  unity_type: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
