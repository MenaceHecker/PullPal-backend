import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../shared/interfaces/user.interface';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);