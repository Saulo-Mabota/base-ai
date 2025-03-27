/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { EntityRUModel } from './entity.model';
import { RoleModel } from 'src/role/model/role.model';

@ObjectType()
export class UserRModel implements User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  customerId: string;

  @Field(() => RoleModel)
  role: RoleModel;
  
  @Field({ nullable: true })
  roleId: string;

  @Field(() => EntityRUModel)
  entity: EntityRUModel;

  @Field({ nullable: true })
  entityId: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
