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
import { CreateStockInput } from './input';
import { StockService } from './stock.service';
import { RestAuthGuard } from 'src/auth/guard/rest-auth.guard';
import { CreateManyStockInput } from './input/create-many-stock.input';
import { QueryStockDto } from './dto/query-stock.dto';
import { UserModel } from 'src/users/model';

@Controller('stock')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class StockController {
  constructor(
    private readonly stockService: StockService,
  ) {}


  @Get()
  @Permissions('list-stock')
  async getStocks(
    @Req() req: Request,
    @Query() options: QueryStockDto,
  ) {
    const user = req.user as UserModel;
    return this.stockService.getStocks(
      user,
      options,
    );
  }

  @Post()
  @Permissions('create-stock')
  async createStock(
    @Body() createStockInputs: CreateStockInput,
    @Req() req: Request,
  ) {
    const user = req.user as UserModel;
    return this.stockService.createStock(
      createStockInputs,
      user,
    );
  }

  @Post('create-many')
  @Permissions('create-stock')
  async createManyStock(
    @Body()
    createManyStockInput: CreateManyStockInput,
  ) {
    return this.stockService.createManyStock(
      createManyStockInput,
    );
  }

  @Delete(':id')
  @Permissions('delete-stock')
  async deleteStock(@Param('id') id: string) {
    return this.stockService.deleteStock(id);
  }
}
