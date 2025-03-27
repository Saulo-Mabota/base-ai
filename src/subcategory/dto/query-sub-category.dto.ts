/* eslint-disable prettier/prettier */
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class QuerySubCategoryDto {
  @IsString()
  @IsOptional()
  skip?: string;

  @IsString()
  @IsOptional()
  take?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;
}
