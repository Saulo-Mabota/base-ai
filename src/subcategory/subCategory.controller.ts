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
import { CreateSubCategoryInput } from './input';
import { SubCategoryService } from './subCategory.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { QuerySubCategoryDto } from './dto/query-sub-category.dto';
import { UserModel } from 'src/users/model';
import { User } from '@prisma/client';

@Controller('subCategory')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get(':id')
  @Permissions('read-subCategory')
  async getSubCategory(@Param('id') id: string) {
    return this.subCategoryService.getSubCategory(id);
  }

  @Get()
  @Permissions('list-subcategory')
  async getSubCategories(@Req() req: Request, @Query() options: QuerySubCategoryDto) {
    const user = req.user as UserModel;
    return this.subCategoryService.getSubCategories(user,options);
  }

  @Post()
  @Permissions('create-subcategory')
  async createSubCategory(@Body() createSubCategoryInput: CreateSubCategoryInput,@Req() req: Request) {
    const user = req.user as UserModel;
    return this.subCategoryService.createOrUpdateSubCategory(createSubCategoryInput,user.role.department.entityId);
  }

  @Delete(':id')
  @Permissions('delete-subcategory')
  async deleteSubcategory(@Param('id') id: string) {
    return this.subCategoryService.deleteSubcategory(id);
  }
}
