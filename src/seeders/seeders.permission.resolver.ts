import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionModel } from 'src/permission/model';
import { PermissionService } from './services/permission.service';

@Resolver(() => PermissionModel)
export class SeedersPermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => [PermissionModel])
  async seederCreatePermissions() {
    try {
      return await this.permissionService.syncPermissions();
    } catch (err) {
      throw err;
    }
  }
}
