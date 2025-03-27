/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '@prisma/client';
import { SubcategoryModel } from './subCategory.model';
// import { StockHasProductModel } from 'src/stockHasProduct/model';

@ObjectType()
export class ProductModel implements Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  subCategoryId: string;

  @Field()
  entityId: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  cover: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => SubcategoryModel)
  subCategory: SubcategoryModel;

  // @Field(() => [StockHasProductModel])
  // ingredients: StockHasProductModel[];
}
