/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAddressDto {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  save_as: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;
  
  @Field()
  @IsString()
  @IsOptional()
  pincode: string;
  
  @Field()
  @IsString()
  @IsOptional()
  address: string;
  
  @Field()
  @IsString()
  @IsOptional()
  city: string;

  @Field()
  @IsString()
  @IsOptional()
  state: string;
  
  @Field()
  @IsString()
  @IsOptional()
  country: string;
  
  @Field()
  @IsString()
  @IsOptional()
  landmark: string;

  @Field()
  @IsString()
  @IsOptional()
  lat: string;

  @Field()
  @IsString()
  @IsOptional()
  long: string;
}
