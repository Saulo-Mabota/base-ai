/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
// import { User } from './user';
import { User } from './user';

@ObjectType()
export class AuthPayload {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
