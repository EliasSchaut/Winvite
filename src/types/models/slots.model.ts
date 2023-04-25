import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description:
    'Represents a time slot for a shift, which can be acquired by multiple participants.',
})
export class SlotsModel {
  @Field(() => String, {
    description: 'Unique identifier of the slot.',
  })
  id!: number;

  @Field(() => Date, {
    description: 'Start time of the slot.',
  })
  start!: Date;

  @Field(() => Date, {
    description: 'End time of the slot.',
  })
  end!: Date;

  @Field(() => Number, {
    description: 'Number of participants that can be assigned to this slot.',
    nullable: true,
  })
  num_of_participants?: number;

  @Field(() => Number, {
    description:
      'Number of free slots, than has not be assigned to participants.',
    nullable: true,
  })
  free_spots?: number;
}
