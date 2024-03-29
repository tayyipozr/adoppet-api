import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    console.log(data);
    const request = ctx.switchToHttp().getRequest();
    if (data)
      return request.user[data];
    return request.user;
  },
);