import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GuestModel } from '@/types/models/guest.model';

@ObjectType()
export class GuestsModel {
  @Field(() => [GuestModel], {
    description: 'All guests.',
  })
  guests!: GuestModel[];

  @Field(() => Int, {
    description: 'Count of all guests.',
  })
  count!: number;
}
