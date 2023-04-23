import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AdsService } from '@/graphql/ads/ads.service';
import { AdsResolver } from '@/graphql/ads/ads.resolver';

@Module({
  providers: [AdsService, AdsResolver, PrismaService, JwtService],
})
export class AdsModule {}
