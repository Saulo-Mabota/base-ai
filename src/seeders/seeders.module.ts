/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SeedersController } from './seeders.controller';

import { JwtModule } from '@nestjs/jwt';
import { SeedersUsersResolver } from './seeders.users.resolver';
import { SeedersRoleResolver } from './seeders.role.resolver';
import { Users, UsersSchema } from 'src/users/schema/user.model.schema';
import { Role, RoleSchema } from 'src/role/schema/role.model.schema';
import { Permission, PermissionSchema } from 'src/permission/schema/permission.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './services/users.service';
import { RoleService } from './services/role.service';
import { DepartmentService } from './services/department.service';
import { SeedersPermissionResolver } from './seeders.permission.resolver';
import { PermissionService } from './services/permission.service';
import { DiscoveryModule } from '@nestjs/core';
import { Entity, EntitySchema } from 'src/entity/schema/entity.model.schema';
import { Department, DepartmentSchema} from 'src/department/schema/department.model.schema';
import { LabelPermission,LabelPermissionSchema } from 'src/permission/schema/labelPermission.model.schema';

@Module({
  imports: [
    // JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: LabelPermission.name, schema: LabelPermissionSchema },
      { name: Entity.name, schema: EntitySchema },
      { name: Department.name, schema: DepartmentSchema },
    ]),
    DiscoveryModule
  ],
  controllers: [SeedersController],
  providers: [
    UsersService,
    SeedersUsersResolver,
    RoleService,
    SeedersRoleResolver,
    PermissionService,
    SeedersPermissionResolver,
    DepartmentService
  ],
})
export class SeedersModule {}
