/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreatePermissionInput, CreateOrUpdatePermissionInput } from './input';
import { PermissionModel } from './model/permission.model';
import { PermissionService } from './permission.service';
import { Permissions } from './decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => PermissionModel)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Permissions('read-permission')
  @Query(() => PermissionModel, { name: 'permission' })
  async getPermission(@Args('id') id: string) {
    return this.permissionService.getPermission(id);
  }

  @Permissions('list-permission')
  @Query(() => [PermissionModel], { name: 'permissions', nullable: 'items' })
  async getPermissions() {
    return this.permissionService.getPermissions();
  }

  @Permissions('create-permission')
  @Mutation(() => PermissionModel)
  async createPermission(
    @Args('createOrUpdatePermissionInput') createOrUpdatePermissionInput: CreateOrUpdatePermissionInput,
  ) {
    return this.permissionService.createPermission(createOrUpdatePermissionInput);
  }
}
