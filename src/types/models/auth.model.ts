import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthModel {
  @Field(() => String, { description: 'The access token.' })
  access_token!: string;
}
