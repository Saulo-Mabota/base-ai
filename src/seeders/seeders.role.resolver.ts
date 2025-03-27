/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoleModel } from 'src/role/model/role.model';
import { RoleService } from './services/role.service';
import { DepartmentService } from './services/department.service';

@Resolver(() => RoleModel)
export class SeedersRoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly departmentService: DepartmentService,
  ) {}

  @Mutation(() => RoleModel)
  async seederCreateRole() {
    try {
      const checkIfExist = await this.roleService.getRolebyName('Admin');
      const checkIfEntityExist = await this.roleService.getEntityName(
        'AdminEntity',
      );
      if (!checkIfExist) {
        if (!checkIfEntityExist) {
          this.roleService
            .createEntity({
              description: 'desc',
              name: 'AdminEntity',
            })
            .then((entity) => {
              this.departmentService
                .createDepartment(entity.id, {
                  name: 'Admin',
                  description: 'desc',
                })
                .then((department) => {
                  return this.roleService.createRole(
                    {
                      description: 'desc',
                      name: 'Admin',
                    },
                    department.id,
                  );
                });
            });
        }
      } else {
        throw new Error('Role alredy exist!');
      }
    } catch (err) {
      throw err;
    }
  }
}
