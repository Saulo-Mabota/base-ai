/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateStockInput } from './input';
import { StockModel } from './model';
import { StockService } from './stock.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';
import { UserModel } from 'src/users/model';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => StockModel)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Permissions('list-stock')
  @Query(() => [StockModel], { name: 'stock', nullable: 'items' })
  async getStocks(@GetUser('user') user: UserModel) {
    return this.stockService.getStocks(user);
  }

  @Permissions('create-stock')
  @Mutation(() => StockModel)
  async createStock(
    @Args('createStockInput') createStockInput: CreateStockInput,
    @GetUser('user') user: UserModel
  ) {
    return this.stockService.createStock(createStockInput,user);
  }
}
