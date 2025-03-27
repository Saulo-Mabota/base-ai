/* eslint-disable prettier/prettier */
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePermissionInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @Field()
  @IsBoolean()
  @IsOptional()
  isMenu: string;

  @Field()
  @IsBoolean()
  @IsOptional()
  position: string;
}
