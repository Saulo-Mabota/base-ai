/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { SubCategory } from '@prisma/client';
import { CategoryPModel } from './category.model';

@ObjectType()
export class SubcategoryModel implements SubCategory {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  categoryId: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => CategoryPModel)
  category: CategoryPModel;
}
