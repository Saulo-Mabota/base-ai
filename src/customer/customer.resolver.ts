/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateCustomerInput } from './input';
import { CustomerModel } from './model/customer.model';
import { CustomerService } from './customer.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => CustomerModel)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Permissions('read:customer')
  @Query(() => CustomerModel, { name: 'customer' })
  async getCustomer(@Args('id') id: string) {
    return this.customerService.getCustomer(id);
  }

  @Permissions('list:customer')
  @Query(() => [CustomerModel], { name: 'customers', nullable: 'items' })
  async getCustomers() {
    return this.customerService.getCustomers();
  }

  @Permissions('create:customer')
  @Mutation(() => CustomerModel)
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    return this.customerService.createCustomer(createCustomerInput);
  }
}
