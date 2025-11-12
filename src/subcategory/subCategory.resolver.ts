/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateSubCategoryInput } from './input';
import { SubCategoryModel } from './model/subCategory.model';
import { SubCategoryService } from './subCategory.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';
import { UserModel } from 'src/users/model';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => SubCategoryModel)
export class SubCategoryResolver {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Permissions('read-subCategory')
  @Query(() => SubCategoryModel, { name: 'subCategory' })
  async getSubCategory(@Args('id') id: string) {
    return this.subCategoryService.getSubCategory(id);
  }

  @Permissions('list-subCategory')
  @Query(() => [SubCategoryModel], { name: 'subCategories', nullable: 'items' })
  async getSubCategories(@GetUser('user') user: UserModel) {
    return this.subCategoryService.getSubCategories(user);
  }

  @Permissions('create-subCategory')
  @Mutation(() => SubCategoryModel)
  async createSubCategory(
    @Args('createSubCategoryInput') createSubCategoryInput: CreateSubCategoryInput,
    @GetUser('entityId') entityId: string,
  ) {
    return this.subCategoryService.createOrUpdateSubCategory(createSubCategoryInput,entityId);
  }
}
