/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Department } from '@prisma/client';
import { EntityDModel } from './entity.model';

@ObjectType()
export class DepartmentModel implements Department {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => EntityDModel)
  entity: EntityDModel;

  @Field({ nullable: true })
  entityId: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
