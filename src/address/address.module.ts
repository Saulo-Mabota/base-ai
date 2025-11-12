/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { JwtModule } from '@nestjs/jwt';
import { AddressResolver } from './address.resolver';
import { AddressSchema, Address, } from './schema/address.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    DiscoveryModule,
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressResolver],
})
export class AddressModule {}
