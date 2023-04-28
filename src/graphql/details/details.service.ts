import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { CtxType } from '@/types/common/ctx.type';
import { DetailModel } from '@/types/models/detail.model';

@Injectable()
export class DetailsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(ctx: CtxType): Promise<DetailModel[]> {
    return (
      await this.prisma.details.findMany({
        where: { server_id: ctx.server_id },
        select: {
          details_info: {
            where: { lang: ctx.i18n.lang },
            select: {
              title: true,
              content: true,
            },
          },
        },
        orderBy: { id: 'asc' },
      })
    ).map((detail) => {
      return {
        title: detail.details_info[0].title,
        content: detail.details_info[0].content,
      };
    });
  }
}
