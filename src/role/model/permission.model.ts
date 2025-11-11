/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Permission } from '@prisma/client';
import { LabelPermissionModel } from 'src/permission/model/labelPermission.model';
import { RoleModel } from 'src/role/model/role.model';

@ObjectType()
export class PermissionRModel implements Permission {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;
  
  @Field()
  isMenu: boolean;

  @Field({ nullable: true })
  position: number;

  @Field(() => RoleModel)
  role: RoleModel;

  @Field(() => [LabelPermissionModel])
  label: LabelPermissionModel[];

  @Field({ nullable: true })
  roleId: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
