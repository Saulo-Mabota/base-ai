/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
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
import { CreateProductInput } from './input';
import { ProductService } from './product.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { User } from '@prisma/client';
import { UserModel } from 'src/users/model';
import { QueryProductDto } from './dto/query-product.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    return this.productService.getProducts(user, options);
  }

  // @Post()
  // @Permissions('create-product')
  // async createProduct(@Body() createProductInput: CreateProductInput,@Req() req: Request) {
  //    const user = req.user as User;
  //   return this.productService.createProduct(createProductInput,user.entityId);
  // }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `product-${uniqueName}${ext}`);
        },
      }),
    }),
  )
  @Permissions('create-product')
  async createProduct(
    @Body() createProductInput: CreateProductInput,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req.user as UserModel;

    if (file) {
      // console.log('File uploaded:', file );
      createProductInput.cover = `uploads/products/${file.filename}`;
    }
    return this.productService.createProduct(
      createProductInput,
      user.role.department.entityId,
    );
  }

  @Delete(':id')
  @Permissions('delete-product')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Delete('ingredient/:id')
  @Permissions('delete-product')
  async deleteIngredient(@Param('id') id: string) {
    return this.productService.removeIngrediente(id);
  }
}
