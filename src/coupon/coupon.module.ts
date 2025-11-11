/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { JwtModule } from '@nestjs/jwt';
import { CouponResolver } from './coupon.resolver';
import { CouponSchema, Coupon, } from './schema/coupon.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
    DiscoveryModule,
  ],
  controllers: [CouponController],
  providers: [CouponService, CouponResolver],
})
export class CouponModule {}
