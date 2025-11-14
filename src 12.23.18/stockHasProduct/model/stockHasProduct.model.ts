/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { StockHasProduct } from '@prisma/client';
import { ProductModel } from 'src/product/model';
import { StockModel } from 'src/stock/model';

@ObjectType()
export class StockHasProductModel implements StockHasProduct {
  @Field()
  id: string;

  @Field()
  productId: string;

  @Field()
  stockId: string;

  @Field({ nullable: true })
  unity_type: string;

  @Field()
  quantity: number;

  @Field(() => ProductModel)
  product: ProductModel;

  @Field(() => StockModel)
  stock: StockModel;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
