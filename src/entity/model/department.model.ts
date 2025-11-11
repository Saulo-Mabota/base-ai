/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Department } from '@prisma/client';
import { EntityModel } from './entity.model';

@ObjectType()
export class DepartmentEModel implements Department {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => EntityModel)
  entity: EntityModel;

  @Field({ nullable: true })
  entityId: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
