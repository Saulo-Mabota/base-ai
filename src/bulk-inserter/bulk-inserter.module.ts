/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BulkInserterService } from './bulk-inserter.service';
import { BulkInserterController } from './bulk-inserter.controller';
import { Stock, StockSchema } from '../stock/schema/stock.model.schema';
import { Category, CategorySchema } from '../category/schema/category.model.schema';
import { Product, ProductSchema } from '../product/schema/product.model.schema';
import { SubCategory, SubCategorySchema } from '../subcategory/schema/subCategory.model.schema';
import { StockHasProduct, StockHasProductSchema } from '../stockHasProduct/schema/stockHasProduct.model.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stock.name, schema: StockSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: StockHasProduct.name, schema: StockHasProductSchema },
    ]),
  ],
  controllers: [BulkInserterController],
  providers: [BulkInserterService],
  exports: [BulkInserterService],
})
export class BulkInserterModule {}
