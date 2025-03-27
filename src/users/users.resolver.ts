/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { PermissionsGuard } from 'src/auth/guard/permissions.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateUserInput } from './input';
import { UserModel } from './model/user.model';
import { UsersService } from './users.service';

@UseGuards(GqlAuthGuard,PermissionsGuard)
@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}


  @Permissions('read-users')
  @Query(() => UserModel,  { name: 'user'})
  async getMe(@GetUser() user: User) {
    // console.log(user);
    return this.userService.getUser(user.id);
  }

  @Permissions('list-users')
  @Query(() => [UserModel], { name: 'users', nullable: 'items' })
  async getUsers(@GetUser('user') user: UserModel) {
    return this.userService.getUsers(user);
  }

  @Permissions('create-users')
  @Mutation(() => UserModel)
  async createUser(
    @GetUser('entityId') entityId: string,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.userService.createUser(entityId,createUserInput);
  }
  
}
