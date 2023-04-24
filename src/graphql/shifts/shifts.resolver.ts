import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ShiftModel } from '@/types/models/shift.model';
import { SlotsModel } from '@/types/models/slots.model';
import { ShiftsService } from '@/graphql/shifts/shifts.service';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';

@Resolver(() => ShiftModel)
export class ShiftsResolver {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Query(() => [ShiftModel])
  async shifts(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ShiftModel[]> {
    return this.shiftsService.find_all_shifts({ server_id, i18n });
  }

  @ResolveField(() => [ShiftModel])
  async slots(
    @Parent() shift: ShiftModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<SlotsModel[]> {
    return this.shiftsService.find_all_slots(shift.id, { server_id, i18n });
  }
}
