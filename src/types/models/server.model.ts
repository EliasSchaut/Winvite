import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Server Informations',
})
export class ServerModel {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  desc?: string;

  @Field(() => String, { nullable: true })
  video?: string;
}
