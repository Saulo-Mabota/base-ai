/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { JwtModule } from '@nestjs/jwt';
import { TableResolver } from './table.resolver';
import { Table, TableSchema } from './schema/table.model.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
  ],
  controllers: [TableController],
  providers: [TableService, TableResolver],
})
export class TableModule {}
