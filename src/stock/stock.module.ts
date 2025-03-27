/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { JwtModule } from '@nestjs/jwt';
import { StockResolver } from './stock.resolver';
import { StockSchema, Stock, } from './schema/stock.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    DiscoveryModule,
  ],
  controllers: [StockController],
  providers: [StockService, StockResolver],
})
export class StockModule {}
