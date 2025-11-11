/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { JwtModule } from '@nestjs/jwt';
import { RoleResolver } from './role.resolver';
import { Role, RoleSchema } from './schema/role.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { PermissionRole, PermissionSchema } from './schema/permission.model.schema';
import { Permission,PermissionSchema } from 'src/permission/schema/permission.model.schema';
import { LabelPermission,LabelPermissionSchema } from 'src/permission/schema/labelPermission.model.schema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
    MongooseModule.forFeature([{ name: LabelPermission.name, schema: LabelPermissionSchema }]),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleResolver],
})
export class RoleModule {}
