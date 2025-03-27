/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateRolePermissionDto } from './create-role-permission.dto';

@InputType()
export class CreateRoleDto {
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
  description?: string;

  @Field(() => [CreateRolePermissionDto])
  @IsArray()
  @IsOptional()
  permission?: CreateRolePermissionDto[];

}
