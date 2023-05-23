import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { GuestlistService } from '@/graphql/guestlist/guestlist.service';
import { GuestlistResolver } from '@/graphql/guestlist/guestlist.resolver';

@Module({
  providers: [GuestlistService, GuestlistResolver, PrismaService],
})
export class GuestlistModule {}
