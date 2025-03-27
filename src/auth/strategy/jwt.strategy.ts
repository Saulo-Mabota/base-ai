/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {

    const user = await this.prisma.user.findUnique({
      where: {
        id:payload.sub
      },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        entity:true,
        entityId:true,
        customer:true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
            departmentId:true,
            department:true,
            permissions:true
          },
        },
        // role: {
        //   include: {
        //     permissions: true,
        //   },
        // },
      },
    });
    console.log('role:', user.role);
    return user;
  }
}
