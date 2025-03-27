/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { PermissionRModel } from './permission.model';
import { UserRModel } from './user.model';
import { EntityModel } from 'src/entity/model';

@ObjectType()
export class RoleModel implements Role {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  entityId: string;

  @Field({ nullable: true })
  departmentId: string;

  @Field(() => EntityModel)
  entity: EntityModel;

  @Field(() => [PermissionRModel])
  permissions: PermissionRModel[];

  @Field(() => [UserRModel])
  Users: UserRModel[];

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
