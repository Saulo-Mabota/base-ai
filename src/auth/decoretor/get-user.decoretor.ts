/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';

export const GetUser = createParamDecorator(
  async (data: string | undefined, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      const request: Express.Request = context.switchToHttp().getRequest();

      if (data) {
        return request.user[data];
      }

      return request.user;
    }
    const ctx = GqlExecutionContext.create(context);

    if (data) {
      let user = ctx.getContext().req.user;
      if (!user.entityId) {
        user = { ...user };
      }
      return user[data];
    }

    return ctx.getContext().req.user;
  },
);
