/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateTableDto {
  @Field()
  @IsString()
  @IsOptional()
  id?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  description?: string;

  @Field()
  @IsNumber()
  @IsOptional()
  customers?: number;
}
