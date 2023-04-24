import { Module } from '@nestjs/common';
import { ShiftsService } from '@/graphql/shifts/shifts.service';
import { ShiftsResolver } from '@/graphql/shifts//shifts.resolver';
import { PrismaService } from '@/common/db/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ShiftsService, ShiftsResolver, PrismaService, JwtService],
})
export class ShiftsModule {}
