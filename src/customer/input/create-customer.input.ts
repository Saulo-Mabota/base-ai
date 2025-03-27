/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field()
  @IsString()
  @IsOptional()
  id: string;

  @Field()
  @IsString()
  @IsOptional()
  firstName: string;

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
  @IsOptional()
  phone_number: string;

  @Field()
  @IsString()
  @IsOptional()
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
