/* eslint-disable prettier/prettier */
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { CreateStockHasProductInput } from './create-stock-has-product.input';

@InputType()
export class CreateManyStockHasProductInput {

  @Field(() => [CreateStockHasProductInput],{ nullable: true })
  @IsArray()
  @IsOptional()
  products?: CreateStockHasProductInput[];

}
