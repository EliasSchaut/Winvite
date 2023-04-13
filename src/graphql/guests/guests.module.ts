import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { GuestsService } from '@/graphql/guests/guests.service';
import { GuestsResolver } from '@/graphql/guests/guests.resolver';

@Module({
  providers: [GuestsService, GuestsResolver, PrismaService],
})
export class GuestsModule {}
