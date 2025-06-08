import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type WSContext = {
  req: {
    extra: {
      user: {
        accountId: string;
      };
    };
  };
};

export const AccountId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    return ctx.getArgByIndex<WSContext>(2).req.extra.user.accountId;
  },
);
