import { Module } from '@nestjs/common';
import { ServerResolver } from '@/graphql/server/server.resolver';
import { ServerService } from '@/graphql/server/server.service';
import { PrismaService } from '@/common/db/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ServerResolver, ServerService, PrismaService, JwtService],
})
export class ServerModule {}
