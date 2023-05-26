import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/common/db/prisma.service';
import { AuthGuard } from '@/graphql/auth/auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql/error';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class AuthAdminGuard extends AuthGuard implements CanActivate {
  constructor(
    protected readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    super(jwtService);
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    if (!(await super.canActivate(ctx))) return false;
    const i18n = I18nContext.current();
    const gql_ctx = GqlExecutionContext.create(ctx);
    const req = gql_ctx.getContext().req;
    const user_id = req.user;
    const db_user = await this.prisma.guest.findUnique({
      where: { id: user_id },
      select: { is_admin: true },
    });

    if (!db_user || !db_user.is_admin) {
      throw new GraphQLError(i18n!.t('auth.invalid.admin'), {
        extensions: { code: 'WARNING' },
      });
    }

    return true;
  }
}
