/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Query,
  Patch,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreatePermissionInput, CreateOrUpdatePermissionInput } from './input';
import { PermissionService } from './permission.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { QueryPermissionDto } from './dto/query-permission.dto';

@Controller('permission')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('find/:id')
  @Permissions('read-permission')
  async getPermission(@Param('id') id: string) {
    return this.permissionService.getPermission(id);
  }

  @Get()
  @Permissions('list-permission')
  async getPermissions(@Query() options: QueryPermissionDto) {
    return this.permissionService.getPermissions(options);
  }

  @Get('/all')
  @Permissions('list-permission')
  async allPermition() {
    return this.permissionService.allPermition();
  }

  @Post()
  @Permissions('create-permission')
  async createPermission(
    @Body() createOrUpdatePermissionInput: CreateOrUpdatePermissionInput,
  ) {
    return this.permissionService.createPermission(
      createOrUpdatePermissionInput,
    );
  }

  @Post('full-permission')
  @Permissions('create-permission')
  async createFullPermission(
    @Body() createPermissionInput: CreatePermissionInput,
  ) {
    return this.permissionService.createFullPermission(createPermissionInput);
  }

  @Patch(':id')
  @Permissions('update-permission')
  async updatePermission(
    @Body() createPermissionInput: CreatePermissionInput,
    @Param('id') id: string,
  ) {
    return this.permissionService.updatePermission(id, createPermissionInput);
  }

  @Post('sync')
  @Permissions('create-permission')
  async sync() {
    return this.permissionService.syncPermissions();
  }
}
