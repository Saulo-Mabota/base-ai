/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { JwtModule } from '@nestjs/jwt';
import { PermissionResolver } from './permission.resolver';
import { Permission, PermissionSchema } from './schema/permission.model.schema';
import { LabelPermission, LabelPermissionSchema } from './schema/labelPermission.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';


@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
    MongooseModule.forFeature([{ name: LabelPermission.name, schema: LabelPermissionSchema }]),
    DiscoveryModule
  ],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionResolver],
})
export class PermissionModule {}
