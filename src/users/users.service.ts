/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { User } from '@prisma/client';

import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/user.model.schema';
import { KeyObject } from 'crypto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from '@prisma/client';
import { UserModel } from './model';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Users.name) private user: Model<Users>,
  ) {}

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        email: true,
        id: true,
        username: true,
        picture: true,
        entity: true,
        entityId: true,
        customerId: true,
        customer:true,
        role: {
          select: {
            id: true,
            name: true,
            departmentId:true,
            department:true,
            permissions: {
              orderBy: { position: 'asc' },
              select: {
                id: true,
                name: true,
                description: true,
                isMenu: true,
                label: {
                  orderBy: { position: 'desc' },
                  select: {
                    id: true,
                    lang: true,
                    title: true,
                    icon: true,
                    link: true,
                    description: true,
                    isHeadr: true,
                    position: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async getUsers(user: UserModel, options: QueryUserDto = {}) {
    const { role } = user;
    const { skip, take, search } = options;
    const baseWhere: any = {};
    let where = { ...baseWhere };
    if (search) {
      baseWhere.OR = [
        {
          roleId: { contains: search },
        },
        {
          name: { contains: search },
        },
      ];
    }
    if (role.name !== 'Admin') {
      where = { ...baseWhere, entityId: user.entityId };
    }
    const total = await this.prisma.user.count({ where: where });
    const users = await this.prisma.user.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where:where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        email: true,
        id: true,
        username: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!users) {
      throw new Error('User not found');
    }
    return {users,total};
  }

  async createUser(entityId: string, createUserDto: CreateUserDto) {
    try {
      const password = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.user.create({
        password,
        email: createUserDto.email,
        picture:createUserDto.picture?createUserDto.picture:'/src/assets/images/all-img/user-default.png',
        roleId: createUserDto.roleId,
        username: createUserDto.username,
        entityId: entityId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // console.log(user);

      user.id = user._id;
      return user;
    } catch (error) {
      // console.log(error.code);
      if (error.code === 11000) {
        // console.log(error.keyValue);
        if (typeof error.keyValue.email != 'undefined') {
          throw new HttpException(`email already exist`, HttpStatus.FORBIDDEN);
        }
        if (typeof error.keyValue.username != 'undefined') {
          throw new HttpException(
            `username already exist`,
            HttpStatus.FORBIDDEN,
          );
        }
      }
      throw error;
    }
  }
}
