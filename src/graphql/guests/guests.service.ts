import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { Guest } from '@/types/models/guest.model';

@Injectable()
export class GuestsService {
  constructor(private readonly prisma: PrismaService) {}
  // @TODO: Get the server ID from the request.
  server_id = Number(process.env.SERVER_ID);

  async findAll(): Promise<Guest[]> {
    return this.prisma.guest.findMany({
      select: { first_name: true, last_name: true },
      where: { server_id: this.server_id },
    });
  }
}
