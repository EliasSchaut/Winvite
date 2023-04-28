import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { OptionModel } from '@/types/models/option.model';
import { CtxType } from '@/types/common/ctx.type';

@Injectable()
export class OptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async find_all(ctx: CtxType): Promise<OptionModel[]> {
    return (
      await this.prisma.options.findMany({
        where: { server_id: ctx.server_id },
        select: {
          name: true,
          options_info: {
            select: { label: true, warning: true },
            where: { lang: ctx.i18n.lang },
          },
          id: true,
        },
        orderBy: { id: 'asc' },
      })
    ).map((option) => {
      return {
        id: option.id,
        name: option.name,
        label: option.options_info[0].label,
        warning: option.options_info[0].warning,
      };
    });
  }
}
