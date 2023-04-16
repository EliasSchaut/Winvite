import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { GuestsService } from '@/graphql/guests/guests.service';
import { GuestModel } from '@/types/models/guest.model';
import { GuestsModel } from '@/types/models/guests.model';
import { GuestInputModel } from '@/types/models/inputs/guest.input';

@Resolver(() => GuestModel)
export class GuestsResolver {
  constructor(private readonly guestsService: GuestsService) {}

  @Query(() => GuestsModel, {
    name: 'guests',
    description: 'Get all guests information.',
  })
  async guests() {
    const guests = this.guestsService.find_all_public();
    const count = this.guestsService.count_all();
    return { guests, count };
  }
  @Mutation(() => GuestModel, { name: 'guest' })
  async add_guest(
    @Args({ name: 'guest_input_data', type: () => GuestInputModel })
    guest_input_data: GuestInputModel,
  ) {
    return this.guestsService.add_guest(guest_input_data);
  }

  @ResolveField()
  async options(@Parent() guest: GuestModel) {
    return this.guestsService.find_options_by_guest(guest.id);
  }
}
