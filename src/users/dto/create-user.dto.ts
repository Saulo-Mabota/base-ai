/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsOptional()
  password?: string;

  @Field()
  @IsString()
  @IsOptional()
  picture?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  roleId: string;
}
