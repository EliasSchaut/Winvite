import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NameModel } from '@/types/models/name.model';

@ObjectType()
export class GuestlistModel {
  @Field(() => [NameModel], {
    description: 'All non anonym guests names.',
  })
  guests!: NameModel[];

  @Field(() => Int, {
    description: 'Count of all guests.',
  })
  count!: number;
}
