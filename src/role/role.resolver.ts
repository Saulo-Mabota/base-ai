/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guard';
import { PermissionsGuard } from 'src/auth/guard/permissions.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateRoleInput } from './input';
import { RoleModel } from './model/role.model';
import { RoleService } from './role.service';
import { GetUser } from 'src/auth/decoretor';

@UseGuards(GqlAuthGuard,PermissionsGuard)
@Resolver(() => RoleModel)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}
  
  @Permissions('read-role')
  @Query(() => RoleModel,  { name: 'role'})
  async getRole(@Args('id') id: string,) {
    return this.roleService.getRole(id);
  }

  @Permissions('list-role')
  @Query(() => [RoleModel], { name: 'roles', nullable: 'items' })
  async getRoles(@GetUser('entityId') entityId: string,) {
    return this.roleService.getRoles(entityId);
  }

  @Permissions('create-role')
  @Mutation(() => RoleModel)
  async createRole(
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
    @GetUser('entityId') entityId: string,
  ) {
    return this.roleService.createRole(createRoleInput,entityId);
  }
}
