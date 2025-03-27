/* eslint-disable prettier/prettier */
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrUpdatePermissionInput {
  @Field()
  @IsString()
  @IsOptional()
  id: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  permissionId: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  lang: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  link: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsString()
  @IsOptional()
  icon: string;

  @Field()
  @IsBoolean()
  @IsOptional()
  isHeadr: string;
}
