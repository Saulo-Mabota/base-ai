/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
// import { User } from '@prisma/client';
import { AuthPayload, User } from './models';
import { I18nContext } from 'nestjs-i18n';
import { Users } from './../users/schema/user.model.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    @InjectModel(Users.name) private user: Model<Users>,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        // role: {
        //   include: {
        //     permissions: true,
        //   },
        // },
      },
    });
    // console.log(dto.email, user);

    if (!user) throw new ForbiddenException('credentials_incorrect');

    const pwMatches = await bcrypt.compare(dto.password, user.password);

    if (!pwMatches) throw new ForbiddenException('credentials_incorrect');

    delete user.password;

    return this.signToken(user);
  }

  async updateAuth(
    id: string,
    dto: AuthDto,
  ): Promise<{ access_token: string; user: User }> {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = await this.user.findOneAndUpdate(
        {
          _id: id,
        },
        { password: hashedPassword },
        {
          new: true,
          runValidators: true,
        },
      );

      if (user) {
        // console.log('user updated', user);
        delete user.password;
      } else {
        console.log('user not found');
      }
      return this.signToken(user);
    } catch (error) {
      console.log('error updating user', error);
    }
  }

  async signToken(user: User): Promise<{ access_token: string; user: User }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret,
    });
    return {
      access_token: token,
      user,
    };
  }
}
