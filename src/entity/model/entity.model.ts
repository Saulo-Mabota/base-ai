/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from '@prisma/client';
import { DepartmentEModel } from './department.model';

@ObjectType()
export class EntityModel implements Entity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [DepartmentEModel])
  departments: DepartmentEModel[];

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
