import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { JwtModule } from '@nestjs/jwt';
import { DepartmentResolver } from './department.resolver';
import { Department, DepartmentSchema } from './schema/department.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
    DiscoveryModule,
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentResolver],
})
export class DepartmentModule {}
