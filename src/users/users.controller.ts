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
import { User } from '@prisma/client';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateUserInput } from './input';
import { UsersService } from './users.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { QueryUserDto } from './dto/query-user.dto';
import { UserModel } from './model';

@Controller('users')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  @Permissions('read-users')
  async getMe(@Req() req: Request) {
    const user = req.user as User;
    return this.userService.getUser(user.id);
  }

  @Get()
  @Permissions('list-users')
  async getUsers(@Req() req: Request, @Query() options: QueryUserDto) {
    const user = req.user as UserModel;
    return this.userService.getUsers(user, options);
  }

  @Post()
  @Permissions('create-users')
  async createUser(
    @Req() req: Request,
    @Body() createUserInput: CreateUserInput,
  ) {
    const user = req.user as User;
    return this.userService.createUser(user.entityId, createUserInput);
  }
}
