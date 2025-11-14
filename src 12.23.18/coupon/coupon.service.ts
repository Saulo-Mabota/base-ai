/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCouponDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Coupon } from './schema/coupon.model.schema';

@Injectable()
export class CouponService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Coupon.name) private coupon: Model<Coupon>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getCoupon(id: string) {
    const entity = await this.prisma.coupon.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        description: true,
      },
    });
    if (!entity) {
      throw new Error('coupon not found');
    }
    return entity;
  }


  async getCoupons() {
    const coupon = await this.prisma.coupon.findMany({
      select: {
        id: true,
        description: true,
      },
    });
    if (!coupon) {
      throw new Error('coupons not found');
    }
    return coupon;
  }

  async createCoupon(createCouponDto: CreateCouponDto) {
    try {
      const coupon = await this.coupon.create({
        ...createCouponDto,
        createdAt:new Date(),
        updatedAt:new Date()
      })
      coupon.id = coupon._id
      delete coupon._id
      return coupon;
    } catch (error) {
      throw error;
    }
  }
  
}
