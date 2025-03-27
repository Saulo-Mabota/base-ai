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
import { CreateProductInput } from './input';
import { ProductService } from './product.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { User } from '@prisma/client';
import { UserModel } from 'src/users/model';
import { QueryProductDto } from './dto/query-product.dto';

@Controller('product')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  @Permissions('read-product')
  async getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Get()
  @Permissions('list-product')
  async getProducts(@Req() req: Request, @Query() options: QueryProductDto) {
    const user = req.user as UserModel;
    return this.productService.getProducts(user,options);
  }

  @Post()
  @Permissions('create-product')
  async createProduct(@Body() createProductInput: CreateProductInput,@Req() req: Request) {
     const user = req.user as User;
    return this.productService.createProduct(createProductInput,user.entityId);
  }
}
