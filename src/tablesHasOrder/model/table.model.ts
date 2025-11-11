/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Table } from '@prisma/client';
import { EntityRUModel } from './entity.model';

@ObjectType()
export class TableModel implements Table {
  @Field()
  id: string;

  @Field()
  entityId: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  customers: number;

  @Field(() => EntityRUModel)
  entity: EntityRUModel;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
