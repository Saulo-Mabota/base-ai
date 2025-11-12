/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { RoleModel } from '../../role/model/role.model';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  // @Field(() => RoleModel)
  // role: RoleModel;

  // @Field()
  // roleId: string;

  @Field({ nullable: true })
  password: string;
}
