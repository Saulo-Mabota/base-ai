/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { I18nContext } from 'nestjs-i18n';
import { AuthService } from './auth.service';
import { GetLang } from './decoretor';
import { LoginInput } from './dto';
import { AuthPayload, User } from './models';

@Resolver(() => AuthPayload)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser() {
    return new User();
  }

  @Mutation(() => AuthPayload)
  async login(
    @GetLang() i18n: I18nContext,
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthPayload> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthPayload)
  async updateAuth(
    @Args('id', { type: () => String }) id: string,
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthPayload> {
    return this.authService.updateAuth(id, loginInput);
  }
}
