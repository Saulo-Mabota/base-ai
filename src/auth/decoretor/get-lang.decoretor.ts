import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { I18nContext } from "nestjs-i18n";

export const GetLang = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const i18nCtx: I18nContext =
      ctx.getType() === "http"
        ? ctx.switchToHttp().getRequest().i18nContext
        : GqlExecutionContext.create(ctx).getContext().i18nContext;

    return i18nCtx;
  }
);
