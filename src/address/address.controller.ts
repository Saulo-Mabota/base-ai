/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateAddressInput } from './input';
import { AddressService } from './address.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';

@Controller('address')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  @Permissions('read-address')
  async getAddress(@Param('id') id: string) {
    return this.addressService.getAddress(id);
  }

  @Get()
  @Permissions('list-address')
  async getAddresss() {
    return this.addressService.getAddresss();
  }

  @Post()
  @Permissions('create-address')
  async createAddress(@Body() createAddressInput: CreateAddressInput) {
    return this.addressService.createAddress(createAddressInput);
  }
}
