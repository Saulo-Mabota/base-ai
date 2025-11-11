/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateCustomerInput } from './input';
import { CustomerService } from './customer.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { UserModel } from 'src/users/model';
import { QueryUserDto } from './dto/query-user.dto';

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
  async getCustomers(@Req() req: Request, @Query() options: QueryUserDto) {
    const user = req.user as UserModel;
    return this.customerService.getCustomers(user, options);
  }

  @Post()
  @Permissions('create-customer')
  async createCustomer(
    @Req() req: Request,
    @Body() createCustomerInput: CreateCustomerInput,
  ) {
    const user = req.user as UserModel;
    return this.customerService.createCustomer(user, createCustomerInput);
  }

  @Delete(':id')
  @Permissions('delete-product')
  async deleteProduct(@Param('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }
}
