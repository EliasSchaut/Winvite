import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { CtxType } from '@/types/common/ctx.type';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async find_by_id({ server_id }: CtxType) {
    return this.prisma.server.findUnique({
      where: {
        id: server_id,
      },
      select: {
        id: true,
        title: true,
        name: true,
        desc: true,
        video: true,
      },
    });
  }
}
