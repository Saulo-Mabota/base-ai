/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, UseGuards, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateTableInput } from './input';
import { TableService } from './table.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { User } from '@prisma/client';
import { QueryTableDto } from './dto/query-table.dto';

@Controller('table')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  @Permissions('list-table')
  async getTables(@Req() req: Request,@Query() options: QueryTableDto) {
    const user = req.user as User;
    return this.tableService.getTables(user.entityId,options);
  }

  @Post()
  @Permissions('create-table')
  async createTable(
    @Req() req: Request,
    @Body() createTableInput: CreateTableInput,
  ) {
    const user = req.user as User;
    return this.tableService.createTable(createTableInput, user.entityId);
  }
}
