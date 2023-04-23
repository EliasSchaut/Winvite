import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GuestsService } from '@/graphql/guests/guests.service';
import { GuestModel } from '@/types/models/guest.model';
import { GuestsModel } from '@/types/models/guests.model';
import { GuestInputModel } from '@/types/models/inputs/guest.input';
import { AuthGuard } from '@/graphql/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserID } from '@/common/decorators/user.decorator';
import { GuestUpdateInputModel } from '@/types/models/inputs/guest_update.input';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';

@Resolver(() => GuestModel)
export class GuestsResolver {
  constructor(private readonly guestsService: GuestsService) {}

  @Query(() => GuestsModel, {
    name: 'guests',
    description: 'Get all guests information.',
  })
  async guests(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<GuestsModel> {
    const guests = await this.guestsService.find_all_public({
      server_id,
      i18n,
    });
    const count = await this.guestsService.count_all({
      server_id,
      i18n,
    });
    return { guests, count };
  }

  @UseGuards(AuthGuard)
  @Query(() => GuestModel, {
    description: 'Get specific guest information.',
  })
  async guest(
    @UserID() guest_id: number,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ) {
    return this.guestsService.find_by_id({ server_id, i18n, guest_id });
  }

  @Mutation(() => GuestModel, { name: 'guest' })
  async add_guest(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
    @Args({ name: 'guest_input_data', type: () => GuestInputModel })
    guest_input_data: GuestInputModel,
  ) {
    console.log(i18n.lang);
    return this.guestsService.add_guest(guest_input_data, { server_id, i18n });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GuestModel, { name: 'update_guest' })
  async update_guest(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() guest_id: number,
    @Args({ name: 'guest_update_data', type: () => GuestUpdateInputModel })
    guest_update_data: GuestUpdateInputModel,
  ): Promise<GuestModel> {
    return this.guestsService.update_guest(guest_update_data, {
      server_id,
      i18n,
      guest_id,
    });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GuestModel, { name: 'delete_guest' })
  async delete_guest(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() guest_id: number,
  ) {
    return this.guestsService.delete_guest({ server_id, i18n, guest_id });
  }

  @ResolveField()
  async options(
    @Parent() guest: GuestModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ) {
    return this.guestsService.find_options_by_guest({
      server_id,
      i18n,
      guest_id: guest.id,
    });
  }
}
