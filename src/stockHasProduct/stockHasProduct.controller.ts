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
import { CreateStockHasProductInput } from './input';
import { StockHasProductService } from './stockHasProduct.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { CreateManyStockHasProductInput } from './input/create-many-stock-has-product.input';
import { QueryStockDto } from './dto/query-stock.dto';
import { UserModel } from 'src/users/model';

@Controller('stockHasProduct')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class StockHasProductController {
  constructor(
    private readonly stockHasProductService: StockHasProductService,
  ) {}

  @Get()
  @Permissions('list-stockHasProduct')
  async getStockHasProducts(
    @Req() req: Request,
    @Query() options: QueryStockDto,
  ) {
    const user = req.user as UserModel;
    return this.stockHasProductService.getStockHasProducts(user, options);
  }

  @Post()
  @Permissions('create-stockHasProduct')
  async createStock(
    @Body() createStockHasProductInput: CreateStockHasProductInput,
    // @Req() req: Request,
  ) {
    // const user = req.user as UserModel;
    return this.stockHasProductService.createStockHasProduct(
      createStockHasProductInput,
    );
  }

  @Post('create-many')
  @Permissions('create-stockHasProduct')
  async createManyStock(
    @Body()
    createManyStockHasProductInput: CreateManyStockHasProductInput,
  ) {
    return this.stockHasProductService.createManyStockHasProduct(createManyStockHasProductInput);
  }

  @Delete(':id')
  @Permissions('delete-stockHasProduct')
  async deleteStock(@Param('id') id: string) {
    return this.stockHasProductService.deleteStockHasProduct(id);
  }
}
