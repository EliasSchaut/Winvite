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
import { AuthGuard } from '@/graphql/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserID } from '@/graphql/auth/user.decorator';

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

  @UseGuards(AuthGuard)
  @Query(() => GuestModel, {
    description: 'Get specific guest information.',
  })
  async guest(@UserID() user_id: number) {
    return this.guestsService.find_by_id(user_id);
  }

  @Mutation(() => GuestModel, { name: 'guest' })
  async add_guest(
    @Args({ name: 'guest_input_data', type: () => GuestInputModel })
    guest_input_data: GuestInputModel,
  ) {
    return this.guestsService.add_guest(guest_input_data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GuestModel, { name: 'guest' })
  async update_guest(
    @Args({ name: 'guest_update_data', type: () => GuestInputModel })
    guest_update_data: GuestInputModel,
    @UserID() user_id: number,
  ) {
    return this.guestsService.update_guest(user_id, guest_update_data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GuestModel, { name: 'delete_guest' })
  async delete_guest(@UserID() user_id: number) {
    return this.guestsService.delete_guest(user_id);
  }

  @ResolveField()
  async options(@Parent() guest: GuestModel) {
    return this.guestsService.find_options_by_guest(guest.id);
  }
}
