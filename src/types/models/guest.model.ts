import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OptionModel } from '@/types/models/option.model';

@ObjectType()
export class GuestModel {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { description: 'The first name of the guest.' })
  first_name!: string;

  @Field(() => String, { description: 'The last name of the guest.' })
  last_name!: string;

  @Field(() => Boolean, {
    description: 'If the guests wants to be displayed publicly.',
  })
  anonymous!: boolean;

  @Field(() => String, {
    description:
      'The challenge of the guest, the user has to provide to authenticate.',
  })
  challenge!: string;

  @Field(() => [OptionModel], {
    description: 'The options the guest has selected.',
  })
  options?: OptionModel[];
}
