/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
