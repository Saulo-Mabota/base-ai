/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from '@prisma/client';
import { DepartmentModel } from 'src/department/model';

@ObjectType()
export class EntityUModel implements Entity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [DepartmentModel])
  departments: DepartmentModel[];

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
