/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateOrderInput {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string; 

  @Field()
  @IsString()
  @IsOptional()
  status: string;
}
