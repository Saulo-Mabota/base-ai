/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreateDepartmentInput } from './input';
import { DepartmentModel } from './model/department.model';
import { DepartmentService } from './department.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';
import { UserModel } from 'src/users/model';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => DepartmentModel)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Permissions('read-department')
  @Query(() => DepartmentModel, { name: 'department' })
  async getDepartment(@Args('id') id: string) {
    return this.departmentService.getDepartment(id);
  }

  @Permissions('list-department')
  @Query(() => [DepartmentModel], { name: 'departments', nullable: 'items' })
  async getDepartments(@GetUser('user') user: UserModel) {
    return this.departmentService.getDepartments(user);
  }

  @Permissions('create-department')
  @Mutation(() => DepartmentModel)
  async createDepartment(
    @GetUser('entityId') entityId: string,
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentService.createDepartment(entityId,createDepartmentInput);
  }
}
