import { Field, InputType, Int } from '@nestjs/graphql';
import { IsName } from '@/common/validation/IsName.validation';

@InputType()
export class GuestUpdateInputModel {
  @IsName({
    message:
      'First name must be between 3 and 20 characters long and start with a capital letter.',
  })
  @Field(() => String, {
    description: 'The first name of the guest.',
    nullable: true,
  })
  first_name?: string;

  @IsName({
    message:
      'First name must be between 3 and 20 characters long and start with a capital letter.',
  })
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
