/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCustomerDto {
  @Field()
  @IsString()
  @IsOptional()
  id: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsOptional()
  type: string;

  @Field()
  @IsString()
  @IsOptional()
  website: string;

  @Field()
  @IsString()
  @IsOptional()
  lastName: string;

  @Field()
  @IsString()
  @IsOptional()
  gender: string;

  @Field()
  @IsString()
  @IsOptional()
  born_date: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  addressId: string;

  @Field()
  @IsString()
  @IsOptional()
  id_number: string;

  @Field()
  @IsString()
  @IsOptional()
  phone_alt_number: string;

  @Field()
  @IsEmail()
  @IsOptional()
  email: string;
}
