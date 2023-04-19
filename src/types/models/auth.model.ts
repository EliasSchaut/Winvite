import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthModel {
  @Field(() => String, { description: 'The barrier token.' })
  barrier_token!: string;
}
