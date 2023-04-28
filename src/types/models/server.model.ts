import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Server Information',
})
export class ServerModel {
  @Field(() => Int)
  id!: number;

  @Field(() => String, {
    description: 'Visible title of the server',
  })
  title!: string;

  @Field(() => String, {
    description: 'Unique name of the server',
  })
  name!: string;

  @Field(() => String, { nullable: true })
  desc?: string;

  @Field(() => String, {
    description: 'Video path for server',
    nullable: true,
  })
  video?: string;
}
