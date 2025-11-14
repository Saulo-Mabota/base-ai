/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateEntityInput } from './input';
import { EntityModel } from './model/entity.model';
import { EntityService } from './entity.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';
import { UserModel } from 'src/users/model';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => EntityModel)
export class EntityResolver {
  constructor(private readonly entityService: EntityService) {}

  @Permissions('read-entity')
  @Query(() => EntityModel, { name: 'entity' })
  async getEntity(@Args('id') id: string) {
    return this.entityService.getEntity(id);
  }

  @Permissions('list-entity')
  @Query(() => [EntityModel], { name: 'entities', nullable: 'items' })
  async getDepartments(@GetUser('user') user: UserModel) {
    return this.entityService.getEntities(user);
  }

  @Permissions('create-entity')
  @Mutation(() => EntityModel)
  async createEntity(
    @Args('createEntityInput') createEntityInput: CreateEntityInput,
  ) {
    return this.entityService.createEntity(createEntityInput);
  }
}
