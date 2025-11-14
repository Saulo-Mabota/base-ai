/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateIngredientDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  stockId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  unity_type: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
