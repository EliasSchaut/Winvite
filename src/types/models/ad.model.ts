import { Field, ObjectType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';

@ObjectType({
  description: 'An ad is describing one feature of the event.',
})
export class AdModel {
  @Field(() => String, { description: 'Title of Ad.' })
  title!: string;

  @Field(() => String, { description: 'Content of Ad.' })
  content!: string;

  @Field(() => Boolean, {
    description: 'Potential link to something.',
    nullable: true,
  })
  link!: string | null;

  @IsUrl({
    require_protocol: true,
    protocols: ['http', 'https'],
    require_host: true,
  })
  @Field(() => String, {
    description: 'An img link describing the ad better.',
    nullable: true,
  })
  image!: string | null;
}
