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
} from '@nestjs/common';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateDepartmentInput } from './input';
import { DepartmentService } from './department.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { User } from '@prisma/client';
import { QueryUserDto } from 'src/users/dto/query-user.dto';
import { UserModel } from 'src/users/model';

@Controller('department')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get(':id')
  @Permissions('read-department')
  async getDepartment(@Param('id') id: string) {
    return this.departmentService.getDepartment(id);
  }

  @Get()
  @Permissions('list-department')
  async getDepartments(@Req() req: Request, @Query() options: QueryUserDto) {
    const user = req.user as UserModel;
    return this.departmentService.getDepartments(user, options);
  }

  @Post()
  @Permissions('create-department')
  async createDepartment(
    @Req() req: Request,
    @Body() CreateDepartmentInput: CreateDepartmentInput,
  ) {
    const user = req.user as User;
    return this.departmentService.createDepartment(
      user.entityId,
      CreateDepartmentInput,
    );
  }
}
