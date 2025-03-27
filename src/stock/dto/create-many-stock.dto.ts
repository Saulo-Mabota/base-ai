/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsOptional,
} from 'class-validator';
import { CreateStockDto } from './create-stock.dto';

@InputType()
export class CreateManyStockDto {

  @IsArray()
  @IsOptional()
  products?: CreateStockDto[];

}
