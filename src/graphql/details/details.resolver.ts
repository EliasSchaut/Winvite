import { Query, Resolver } from '@nestjs/graphql';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { DetailsService } from '@/graphql/details/details.service';
import { DetailModel } from '@/types/models/detail.model';

@Resolver(() => DetailModel)
export class DetailsResolver {
  constructor(private readonly detailsService: DetailsService) {}

  @Query(() => [DetailModel])
  async details(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<DetailModel[]> {
    return this.detailsService.findAll({ server_id, i18n });
  }
}
