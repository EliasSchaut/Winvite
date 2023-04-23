import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'An ad is describing one feature of the event.',
})
export class AdModel {
  @Field(() => String, { description: 'Title of Ad.' })
  title!: string;

  @Field(() => String, { description: 'Content of Ad.' })
  content!: string;

  @Field(() => String, {
    description: 'Potential link to something.',
    nullable: true,
  })
  link!: string | null;

  @Field(() => String, {
    description: 'An img link describing the ad better.',
    nullable: true,
  })
  img!: string | null;
}
