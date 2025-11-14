/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateIngredientDto } from './create.ingredient.dto';

@InputType()
export class CreateProductDto {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  subCategoryId: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;

  @Field()
  @IsString()
  @IsOptional()
  cover: string;

  @Field()
  @IsString()
  @IsOptional()
  price: number;

  @Field()
  @IsString()
  @IsOptional()
  quantity: number;

  @Field(() => [CreateIngredientDto], { nullable: true })
  @IsString()
  @IsOptional()
  ingredients: CreateIngredientDto[];
}
