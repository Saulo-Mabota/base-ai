/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateCategoryInput } from './input';
import { CategoryModel } from './model/category.model';
import { CategoryService } from './category.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';
import { UserModel } from 'src/users/model';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => CategoryModel)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Permissions('read-category')
  @Query(() => CategoryModel, { name: 'category' })
  async getCategory(@Args('id') id: string) {
    return this.categoryService.getCategory(id);
  }

  @Permissions('list-category')
  @Query(() => [CategoryModel], { name: 'categories', nullable: 'items' })
  async getCategories(@GetUser('user') user: UserModel) {
    return this.categoryService.getCategories(user);
  }

  @Permissions('create-category')
  @Mutation(() => CategoryModel)
  async createCategory(
    @GetUser('entityId') entityId: string,
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {

    return this.categoryService.createCategory(createCategoryInput,entityId);
  }
}
