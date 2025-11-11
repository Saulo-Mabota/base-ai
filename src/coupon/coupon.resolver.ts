/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateCouponInput } from './input';
import { CouponModel } from './model/coupon.model';
import { CouponService } from './coupon.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => CouponModel)
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Permissions('read-coupon')
  @Query(() => CouponModel, { name: 'coupon' })
  async getCoupon(@Args('id') id: string) {
    return this.couponService.getCoupon(id);
  }

  @Permissions('list-coupon')
  @Query(() => [CouponModel], { name: 'coupons', nullable: 'items' })
  async getCoupons() {
    return this.couponService.getCoupons();
  }

  @Permissions('create-coupon')
  @Mutation(() => CouponModel)
  async createCoupon(
    @Args('createCouponInput') createCouponInput: CreateCouponInput,
  ) {
    return this.couponService.createCoupon(createCouponInput);
  }
}
