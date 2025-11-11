/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePermissionDto {
  @Field()
  @IsString()
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
