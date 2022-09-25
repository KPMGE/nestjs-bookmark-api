import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    // if we want to get specific fields from the user
    if (data) {
      return request.user[data]
    }

    // returns the whole user
    return request.user;
  }
)
