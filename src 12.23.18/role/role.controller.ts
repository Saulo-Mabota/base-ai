/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateRoleInput } from './input';
import { RoleService } from './role.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { User } from '@prisma/client';
import { QueryRoleDto } from './dto/query-role.dto';
import { UserModel } from 'src/users/model';

@Controller('role')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Permissions('list-role')
  async getRoles(@Req() req: Request, @Query() options: QueryRoleDto) {
    const user = req.user as UserModel;
    // console.log(user.role.departmentId);
    return this.roleService.getRoles(user, options);
  }

  @Post()
  @Permissions('create-role')
  async createRole(
    @Req() req: Request,
    @Body() createRoleInput: CreateRoleInput,
  ) {
    const user = req.user as UserModel;
    const departmentId = createRoleInput.departmentId
      ? createRoleInput.departmentId
      : user.role.departmentId;
    return this.roleService.createRole(createRoleInput, departmentId);
  }
}
