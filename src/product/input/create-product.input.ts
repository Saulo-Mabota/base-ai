/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

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

}
