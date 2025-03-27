/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { JwtModule } from '@nestjs/jwt';
import { CategoryResolver } from './category.resolver';
import { CategorySchema, Category, } from './schema/category.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    DiscoveryModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
