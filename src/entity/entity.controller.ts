import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateEntityInput } from './input';
import { EntityService } from './entity.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';

@Controller('entity')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get(':id')
  @Permissions('read-entity')
  async getEntity(@Param('id') id: string) {
    return this.entityService.getEntity(id);
  }

  @Get()
  @Permissions('list-entity')
  async getEntities() {
    return this.entityService.getEntities();
  }

  @Post()
  @Permissions('create-entity')
  async createEntity(@Body() CreateEntityInput: CreateEntityInput) {
    return this.entityService.createEntity(CreateEntityInput);
  }
}
