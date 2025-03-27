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
import { CreateCustomerInput } from './input';
import { CustomerService } from './customer.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';

@Controller('customer')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get(':id')
  @Permissions('read-customer')
  async getCustomer(@Param('id') id: string) {
    return this.customerService.getCustomer(id);
  }

  @Get()
  @Permissions('list-customer')
  async getCustomers() {
    return this.customerService.getCustomers();
  }

  @Post()
  @Permissions('create-customer')
  async createCustomer(@Body() createCustomerInput: CreateCustomerInput) {
    return this.customerService.createCustomer(createCustomerInput);
  }
}
