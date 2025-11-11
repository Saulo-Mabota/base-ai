/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { SubCategory } from '@prisma/client';
import { CategorySModel } from './category.model';

@ObjectType()
export class SubCategoryModel implements SubCategory {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  categoryId: string;

  @Field()
  entityId: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => CategorySModel)
  category: CategorySModel;
}
