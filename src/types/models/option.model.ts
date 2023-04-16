import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OptionModel {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { description: 'Key of option.' })
  name!: string;

  @Field(() => String, { description: 'Visible short description of option.' })
  label!: string;

  @Field(() => String, {
    description: 'If the guests wants to be displayed publicly.',
    nullable: true,
  })
  warning!: string | null;
}
