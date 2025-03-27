/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateProductInput } from './input';
import { ProductModel } from './model/product.model';
import { ProductService } from './product.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';
import { UserModel } from 'src/users/model';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => ProductModel)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Permissions('read-product')
  @Query(() => ProductModel, { name: 'product' })
  async getProduct(@Args('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Permissions('list-product')
  @Query(() => [ProductModel], { name: 'products', nullable: 'items' })
  async getProducts(@GetUser('user') user: UserModel) {
    return this.productService.getProducts(user);
  }

  @Permissions('create-product')
  @Mutation(() => ProductModel)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @GetUser('entityId') entityId: string,
  ) {

    return this.productService.createProduct(createProductInput,entityId);
  }
}
