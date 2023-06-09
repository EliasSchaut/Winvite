import { Module } from '@nestjs/common';
import { AuthService } from '@/graphql/auth/auth.service';
import { PrismaService } from '@/common/db/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from '@/graphql/auth/auth.resolver';
import { AuthGuard } from '@/graphql/auth/auth.guard';
import { AuthAdminGuard } from '@/graphql/auth/auth_admin.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION as string },
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthAdminGuard,
    AuthResolver,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
