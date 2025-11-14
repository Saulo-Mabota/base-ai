/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { PrismaModule } from './prisma/prisma.module';
import { SeedersModule } from './seeders/seeders.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './auth/guard/permissions.guard';
import { EntityModule } from './entity/entity.module';
import { ConfigService } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subcategory/subCategory.module';
import { ProductModule } from './product/product.module';
import { AddressModule } from './address/address.module';
import { CustomerModule } from './customer/customer.module';
import { CouponModule } from './coupon/coupon.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './orders/orders.module';
import { StockModule } from './stock/stock.module';
import { StockHasProductModule } from './stockHasProduct/stockHasProduct.module';

const config = new ConfigService()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(config.get('DATABASE_URL')),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RoleModule,
    PermissionModule,
    SeedersModule,
    EntityModule,
    DepartmentModule,
    CategoryModule,
    SubCategoryModule,
    ProductModule,
    AddressModule,
    CustomerModule,
    CouponModule,
    OrderModule,
    PaymentModule,
    StockModule,
    StockHasProductModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    AppService,
  ],
})
export class AppModule {}
