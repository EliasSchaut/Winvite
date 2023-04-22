import { Query, Resolver } from '@nestjs/graphql';
import { OptionsService } from '@/graphql/options/options.service';
import { OptionModel } from '@/types/models/option.model';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { ServerID } from '@/common/decorators/server.decorator';
import type { CtxType } from '@/types/common/ctx.type';

@Resolver(() => OptionModel)
export class OptionsResolver {
  constructor(private readonly optionsService: OptionsService) {}

  @Query(() => [OptionModel], {
    name: 'options',
    description: 'Get all options.',
  })
  async options(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @ServerID() server_id: number,
  ): Promise<OptionModel[]> {
    return this.optionsService.find_all({ i18n, server_id } as CtxType);
  }
}
