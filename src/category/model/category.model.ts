/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '@prisma/client';

@ObjectType()
export class CategoryModel implements Category {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  type: string;

  @Field()
  entityId: string;

  @Field({ nullable: true })
  departmentId: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
