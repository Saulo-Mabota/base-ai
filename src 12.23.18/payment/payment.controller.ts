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
import { CreatePaymentInput } from './input';
import { PaymentService } from './payment.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { UserModel } from 'src/users/model';

@Controller('payment')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get(':id')
  @Permissions('read-payment')
  async getPayment(@Param('id') id: string) {
    return this.paymentService.getPayment(id);
  }

  @Get()
  @Permissions('list-payment')
  async getPayments() {
    return this.paymentService.getPayments();
  }

  @Post()
  @Permissions('create-payment')
  async createPayment(@Body() createPaymentInput: CreatePaymentInput, @Req() req: Request,) {
    const user = req.user as UserModel;
    return this.paymentService.createPayment(createPaymentInput,user);
  }
}
