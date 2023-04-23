import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'A detail block describing one aspect of the event specific.',
})
export class DetailModel {
  @Field(() => String, { description: 'Title of Detail.' })
  title!: string;

  @Field(() => String, { description: 'Content of Detail.' })
  content!: string;
}
