import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GuestUpdateInputModel {
  @Field(() => String, {
    description: 'The first name of the guest.',
    nullable: true,
  })
  first_name?: string;

  @Field(() => String, {
    description: 'The last name of the guest.',
    nullable: true,
  })
  last_name?: string;

  @Field(() => Boolean, {
    description: 'If the guests wants to be displayed publicly.',
    nullable: true,
  })
  anonymous?: boolean;

  @Field(() => [Int], {
    description: 'The options the guest has selected.',
    nullable: true,
  })
  option_ids?: number[];
}
