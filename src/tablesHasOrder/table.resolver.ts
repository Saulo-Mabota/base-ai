/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guard';
import { PermissionsGuard } from 'src/auth/guard/permissions.guard';
import { Permissions } from 'src/permission/decoretor/permission.decorator';
import { CreateTableInput } from './input';
import { TableModel } from './model/table.model';
import { TableService } from './table.service';
import { GetUser } from 'src/auth/decoretor';

@UseGuards(GqlAuthGuard,PermissionsGuard)
@Resolver(() => TableModel)
export class TableResolver {
  constructor(private readonly tableService: TableService) {}
  
  @Permissions('read-table')
  @Query(() => TableModel,  { name: 'table'})
  async getTable(@Args('id') id: string,) {
    return this.tableService.getTable(id);
  }

  @Permissions('list-table')
  @Query(() => [TableModel], { name: 'tables', nullable: 'items' })
  async getTables(@GetUser('entityId') entityId: string,) {
    return this.tableService.getTables(entityId);
  }

  @Permissions('create-table')
  @Mutation(() => TableModel)
  async createTable(
    @Args('createTableInput') createTableInput: CreateTableInput,
    @GetUser('entityId') entityId: string,
  ) {
    return this.tableService.createTable(createTableInput,entityId);
  }
}
