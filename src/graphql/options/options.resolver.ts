import { Query, Resolver } from '@nestjs/graphql';
import { OptionsService } from '@/graphql/options/options.service';
import { OptionModel } from '@/types/models/option.model';

@Resolver(() => OptionModel)
export class OptionsResolver {
  constructor(private readonly optionsService: OptionsService) {}

  @Query(() => [OptionModel], {
    name: 'options',
    description: 'Get all options.',
  })
  async options() {
    return this.optionsService.find_all();
  }
}
