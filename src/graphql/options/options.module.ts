import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { OptionsResolver } from '@/graphql/options/options.resolver';
import { OptionsService } from '@/graphql/options/options.service';

@Module({
  providers: [OptionsResolver, OptionsService, PrismaService],
})
export class OptionsModule {}
