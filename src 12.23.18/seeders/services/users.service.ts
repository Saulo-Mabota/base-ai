/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
// import { User } from '@prisma/client';

import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/users/schema/user.model.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Users.name) private user: Model<Users>,
  ) {}

  async getRolebyName(name: string) {
    const role = await this.prisma.role.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  }

  async createUser(entityId:string,createUserDto: CreateUserDto) {
    try {
      const password = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.user.create({
        password,
        email: createUserDto.email,
        roleId: createUserDto.roleId,
        entityId: entityId,
        username: createUserDto.username,
        picture: createUserDto.picture,
        createdAt:new Date(),
        updatedAt:new Date(),
        
      });
      // console.log(user);
      user.id = user._id;
      return user;
    } catch (error) {
      throw error;
    }
  }
}
