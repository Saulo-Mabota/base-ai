/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StockHasProductController } from './stockHasProduct.controller';
import { StockHasProductService } from './stockHasProduct.service';
import { JwtModule } from '@nestjs/jwt';
import { StockHasProductResolver } from './stockHasProduct.resolver';
import { StockHasProductSchema, StockHasProduct, } from './schema/stockHasProduct.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: StockHasProduct.name, schema: StockHasProductSchema }]),
    DiscoveryModule,
  ],
  controllers: [StockHasProductController],
  providers: [StockHasProductService, StockHasProductResolver
  ],
})
export class StockHasProductModule {}
