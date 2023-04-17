import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '@/graphql/auth/auth.service';
import { AuthModel } from '@/types/models/auth.model';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthModel)
  async sign_in(@Args('challenge') challenge: string) {
    return await this.authService.sign_in(challenge);
  }
}
