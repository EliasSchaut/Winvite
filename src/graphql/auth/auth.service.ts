import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModel } from '@/types/models/auth.model';
import { CtxType } from '@/types/common/ctx.type';
import { GraphQLError } from 'graphql/error';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async sign_in(challenge: string, ctx: CtxType): Promise<AuthModel> {
    const guest = await this.prisma.guest.findUnique({
      select: { id: true },
      where: { challenge: challenge },
    });

    if (guest === null) {
      throw new GraphQLError(ctx.i18n.t('auth.invalid.challenge'), {
        extensions: { code: 'UNAUTHORIZED' },
      });
    }

    const payload = { username: guest.id, sub: null };
    return {
      barrier_token: await this.jwtService.signAsync(payload),
    };
  }
}
