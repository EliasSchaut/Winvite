import { Query, Resolver } from '@nestjs/graphql';
import { AdModel } from '@/types/models/ad.model';
import { AdsService } from '@/graphql/ads/ads.service';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';

@Resolver(() => AdModel)
export class AdsResolver {
  constructor(private readonly adsService: AdsService) {}

  @Query(() => [AdModel])
  async ads(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<AdModel[]> {
    return this.adsService.findAll({ server_id, i18n });
  }
}
