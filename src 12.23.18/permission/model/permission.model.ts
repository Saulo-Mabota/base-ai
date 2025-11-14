/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Permission } from '@prisma/client';
import { RoleModel } from 'src/role/model/role.model';
import { LabelPermissionModel } from './labelPermission.model';

@ObjectType()
export class PermissionModel implements Permission {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  isMenu: boolean;

  @Field(() => RoleModel)
  role: RoleModel;

  @Field({ nullable: true })
  position: number;

  @Field({ nullable: true })
  roleId: string;

  @Field(() => [LabelPermissionModel])
  label: LabelPermissionModel[];

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
