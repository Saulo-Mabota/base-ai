/* eslint-disable prettier/prettier */
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { CreateRolePermissionInput } from './create-role-permission.input';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsString()
  @IsOptional()
  id?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;

  @Field(() => [CreateRolePermissionInput])
  @IsArray()
  @IsOptional()
  permission?: CreateRolePermissionInput[];
}
