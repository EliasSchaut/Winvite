import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { CtxType } from '@/types/common/ctx.type';
import { NameModel } from '@/types/models/name.model';

@Injectable()
export class GuestlistService {
  constructor(private readonly prisma: PrismaService) {}

  async find_all(ctx: CtxType): Promise<NameModel[]> {
    return this.prisma.guest.findMany({
      where: { server_id: ctx.server_id, anonymous: false },
      orderBy: { first_name: 'asc' },
    });
  }

  async count_all(ctx: CtxType) {
    return this.prisma.guest.count({
      where: { server_id: ctx.server_id },
    });
  }
}
