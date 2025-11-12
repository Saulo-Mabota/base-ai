/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { JwtModule } from '@nestjs/jwt';
import { CustomerResolver } from './customer.resolver';
import { CustomerSchema, Customer, } from './schema/customer.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    DiscoveryModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerResolver],
})
export class CustomerModule {}
