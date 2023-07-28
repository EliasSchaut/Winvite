import { Query, Resolver } from '@nestjs/graphql';
import { GuestlistModel } from '@/types/models/guestlist.model';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { GuestlistService } from '@/graphql/guestlist/guestlist.service';

@Resolver(() => GuestlistModel)
export class GuestlistResolver {
  constructor(private readonly guestlistService: GuestlistService) {}

  @Query(() => GuestlistModel, {
    name: 'guestlist',
    description: 'Get all public guests information.',
  })
  async guestlist(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<GuestlistModel> {
    const guests = await this.guestlistService.find_all({
      server_id,
      i18n,
    });
    const count = await this.guestlistService.count_all({
      server_id,
      i18n,
    });
    return { guests, count };
  }
}
