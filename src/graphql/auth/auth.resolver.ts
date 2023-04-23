import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '@/graphql/auth/auth.service';
import { AuthModel } from '@/types/models/auth.model';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthModel)
  async sign_in(
    @Args('challenge') challenge: string,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<AuthModel> {
    return await this.authService.sign_in(challenge, { server_id, i18n });
  }
}
