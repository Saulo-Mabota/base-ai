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
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { PermissionsGuard } from 'src/auth/guard/permissions.rest.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateCategoryInput } from './input';
import { CategoryService } from './category.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { User } from '@prisma/client';
import { QueryCategoryDto } from './dto/query-category.dto';
import { UserModel } from 'src/users/model';

@Controller('category')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  @Permissions('read-category')
  async getCategory(@Param('id') id: string) {
    return this.categoryService.getCategory(id);
  }

  @Get()
  @Permissions('list-category')
  async getCategories(@Req() req: Request, @Query() options: QueryCategoryDto) {
    const user = req.user as UserModel;
    return this.categoryService.getCategories(user, options);
  }

  @Post()
  @Permissions('create-category')
  async createCategory(
    @Body() createCategoryInput: CreateCategoryInput,
    @Req() req: Request,
  ) {
    const user = req.user as UserModel;
    return this.categoryService.createCategory(
      createCategoryInput,
      user.role.department.entityId,
    );
  }

  @Delete(':id')
  @Permissions('delete-category')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
