/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserModel } from 'src/users/model/user.model';
import { RoleService } from './services/role.service';
import { UsersService } from './services/users.service';

@Resolver(() => UserModel)
export class SeedersUsersResolver {
  constructor(private readonly userService: UsersService,private readonly roleService: RoleService) {}

  @Mutation(() => UserModel)
  async seederCreateUser() {
    try {
      const checkIfExist = await this.userService.getRolebyName('Admin');
      const checkIfEntityExist = await this.roleService.getEntityName('AdminEntity');
      if (checkIfExist && checkIfEntityExist) {
        return this.userService.createUser(checkIfEntityExist.id,{
          email: 'admin@mbm.com',
          roleId: checkIfExist.id,
          picture:"/src/assets/images/all-img/user-default.png",
          password: '12345678',
          username: 'Seeder',
        
        });
      } else {
        throw new Error('Role or Entity not found , run `seederCreateRole` first!');
      }
    } catch (err) {
      throw err;
    }
  }
}
