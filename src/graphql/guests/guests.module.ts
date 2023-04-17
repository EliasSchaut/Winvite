import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { GuestsService } from '@/graphql/guests/guests.service';
import { GuestsResolver } from '@/graphql/guests/guests.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [GuestsService, GuestsResolver, PrismaService, JwtService],
})
export class GuestsModule {}
