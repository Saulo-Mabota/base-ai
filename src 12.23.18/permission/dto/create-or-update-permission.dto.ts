/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';


@InputType()
export class CreateOrUpdatePermissionDto {

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
