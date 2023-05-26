import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NameModel {
  @Field(() => String, {
    description: 'First name of the guest.',
  })
  first_name!: string;

  @Field(() => String, {
    description: 'Last name of the guest.',
  })
  last_name!: string;
}
