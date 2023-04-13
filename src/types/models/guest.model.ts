import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Guest {
  @Field(() => String, { description: 'The first name of the guest.' })
  first_name!: string;

  @Field(() => String, { description: 'The last name of the guest.' })
  last_name!: string;
}
