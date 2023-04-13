import { Resolver, Query } from '@nestjs/graphql';
import { GuestsService } from '@/graphql/guests/guests.service';
import { Guest } from '@/types/models/guest.model';

@Resolver(() => Guest)
export class GuestsResolver {
  constructor(private readonly guestsService: GuestsService) {}

  @Query(() => [Guest])
  async guest() {
    return this.guestsService.findAll();
  }
}
