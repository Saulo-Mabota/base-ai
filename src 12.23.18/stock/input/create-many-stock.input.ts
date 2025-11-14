/* eslint-disable prettier/prettier */
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { CreateStockInput } from './create-stock.input';

@InputType()
export class CreateManyStockInput {

  @Field(() => [CreateStockInput],{ nullable: true })
  @IsArray()
  @IsOptional()
  products?: CreateStockInput[];

}
