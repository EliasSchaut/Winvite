import { Field, ObjectType } from '@nestjs/graphql';
import { SlotsModel } from '@/types/models/slots.model';

@ObjectType({
  description:
    'Represents a shift on a server, which holds multiple slots for participants to acquire.',
})
export class ShiftModel {
  @Field(() => Number, {
    description: 'Unique identifier of the shift.',
  })
  id!: number;

  @Field(() => String, {
    description: 'Name of the shift.',
  })
  name!: string;

  @Field(() => String, {
    description: 'Description of the shift.',
  })
  desc!: string;

  @Field(() => [SlotsModel], {
    description: 'Slots of the shift.',
  })
  slots!: SlotsModel[];
}
