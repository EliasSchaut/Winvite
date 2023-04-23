import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { DetailsService } from '@/graphql/details/details.service';
import { DetailsResolver } from '@/graphql/details/details.resolver';

@Module({
  providers: [DetailsService, DetailsResolver, PrismaService, JwtService],
})
export class DetailsModule {}
