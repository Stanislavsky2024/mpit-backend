import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { User } from '../../../generated/prisma';

export const Authorized = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.user as User;

    return data ? user[data] : user['id'];
  },
);
