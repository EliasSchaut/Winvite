import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { AdModel } from '@/types/models/ad.model';
import { CtxType } from '@/types/common/ctx.type';

@Injectable()
export class AdsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(ctx: CtxType): Promise<AdModel[]> {
    return (
      await this.prisma.ads.findMany({
        where: { server_id: ctx.server_id },
        select: {
          link: true,
          image: true,
          ads_info: {
            select: {
              title: true,
              content: true,
            },
            where: { lang: ctx.i18n.lang },
          },
        },
        orderBy: {
          id: 'asc',
        },
      })
    ).map((ad) => {
      return {
        title: ad.ads_info[0].title,
        content: ad.ads_info[0].content,
        link: ad.link,
        image: ad.image,
      };
    });
  }
}
