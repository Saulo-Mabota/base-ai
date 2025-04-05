/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Stock } from '@prisma/client';
import { CategoryModel } from 'src/category/model';
import { DepartmentModel } from 'src/department/model';

@ObjectType()
export class StockModel implements Stock {
  @Field()
  id: string;

  @Field()
  departmentId: string;

  @Field()
  categoryId: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  unity_type: string;

  @Field({ nullable: true })
  unit_price: number;

  @Field()
  quantity: number;

  @Field({ defaultValue: true })
  isActive: boolean;

  @Field(() => DepartmentModel)
  department: DepartmentModel;

  @Field(() => CategoryModel)
  cacategory: CategoryModel;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
