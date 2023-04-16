import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GuestInputModel {
  @Field(() => String, { description: 'The first name of the guest.' })
  first_name!: string;

  @Field(() => String, { description: 'The last name of the guest.' })
  last_name!: string;

  @Field(() => Boolean, {
    description: 'If the guests wants to be displayed publicly.',
  })
  anonymous!: boolean;

  @Field(() => [Int], {
    description: 'The options the guest has selected.',
  })
  option_ids!: number[];
}
