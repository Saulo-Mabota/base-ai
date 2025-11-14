/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsOptional,
} from 'class-validator';
import { CreateStockHasProductDto } from './create-stock-has-product.dto';

@InputType()
export class CreateManyStockHasProductDto {

  @IsArray()
  @IsOptional()
  products?: CreateStockHasProductDto[];

}
