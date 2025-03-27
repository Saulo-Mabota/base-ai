/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { JwtModule } from '@nestjs/jwt';
import { ProductResolver } from './product.resolver';
import { ProductSchema, Product, } from './schema/product.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    DiscoveryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
