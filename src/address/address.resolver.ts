/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateAddressInput } from './input';
import { AddressModel } from './model/address.model';
import { AddressService } from './address.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => AddressModel)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Permissions('read-address')
  @Query(() => AddressModel, { name: 'address' })
  async getAddress(@Args('id') id: string) {
    return this.addressService.getAddress(id);
  }

  @Permissions('list-address')
  @Query(() => [AddressModel], { name: 'addresss', nullable: 'items' })
  async getAddresss() {
    return this.addressService.getAddresss();
  }

  @Permissions('create-address')
  @Mutation(() => AddressModel)
  async createAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ) {
    return this.addressService.createAddress(createAddressInput);
  }
}
