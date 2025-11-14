/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateStockHasProductInput } from './input';
import { StockHasProductModel } from './model';
import { StockHasProductService } from './stockHasProduct.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';
import { UserModel } from 'src/users/model';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => StockHasProductModel)
export class StockHasProductResolver {
  constructor(private readonly stockHasProductService: StockHasProductService) {}

  @Permissions('list-stockHasProduct')
  @Query(() => [StockHasProductModel], { name: 'stock', nullable: 'items' })
  async getStockHasProducts(@GetUser('user') user: UserModel) {
    return this.stockHasProductService.getStockHasProducts(user);
  }

  @Permissions('create-stockHasProduct')
  @Mutation(() => StockHasProductModel)
  async createStockHasProduct(
    @Args('createStockHasProductInput') createStockHasProductInput: CreateStockHasProductInput,
    // @GetUser('user') user: UserModel
  ) {
    return this.stockHasProductService.createStockHasProduct(createStockHasProductInput);
  }
}
