/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SubCategoryController } from './subCategory.controller';
import { SubCategoryService } from './subCategory.service';
import { JwtModule } from '@nestjs/jwt';
import { SubCategoryResolver } from './subCategory.resolver';
import { SubCategorySchema, SubCategory, } from './schema/subCategory.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: SubCategory.name, schema: SubCategorySchema }]),
    DiscoveryModule,
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, SubCategoryResolver],
})
export class SubCategoryModule {}
