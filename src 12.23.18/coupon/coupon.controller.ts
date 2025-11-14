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
import { CreateCouponInput } from './input';
import { CouponService } from './coupon.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';

@Controller('coupon')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get(':id')
  @Permissions('read-coupon')
  async getCoupon(@Param('id') id: string) {
    return this.couponService.getCoupon(id);
  }

  @Get()
  @Permissions('list-coupon')
  async getCoupons() {
    return this.couponService.getCoupons();
  }

  @Post()
  @Permissions('create-coupon')
  async createCoupon(@Body() createCouponInput: CreateCouponInput) {
    return this.couponService.createCoupon(createCouponInput);
  }
}
