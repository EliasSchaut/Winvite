import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';

@Injectable()
export class OptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async find_all() {
    return this.prisma.options.findMany({
      where: { server_id: Number(process.env.SERVER_ID) },
    });
  }
}
