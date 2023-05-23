import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { GuestService } from '@/graphql/guest/guest.service';
import { GuestResolver } from '@/graphql/guest/guest.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [GuestService, GuestResolver, PrismaService, JwtService],
})
export class GuestModule {}
