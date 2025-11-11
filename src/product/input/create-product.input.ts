/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { CreateIngredientDto } from '../dto/create.ingredient.dto';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsEmail()
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
  ingredients: CreateIngredientDto [];
}
