import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { GuestInputModel } from '@/types/models/inputs/guest.input';
import { Prisma } from '@prisma/client';
import { GuestModel } from '@/types/models/guest.model';

@Injectable()
export class GuestsService {
  constructor(private readonly prisma: PrismaService) {}

  // @TODO: Get the server ID from the request.
  server_id = Number(process.env.SERVER_ID);

  async find_all_public() {
    return this.prisma.guest.findMany({
      where: { server_id: this.server_id, anonymous: false },
    });
  }

  async find_by_id(guest_id: number): Promise<GuestModel | null> {
    return this.prisma.guest.findUnique({
      where: { id: guest_id },
    });
  }

  async count_all() {
    return this.prisma.guest.count({
      where: { server_id: this.server_id },
    });
  }

  async find_all() {
    return this.prisma.guest.findMany({
      where: { server_id: this.server_id },
    });
  }

  async find_options_by_guest(guest_id: number) {
    const guest_options = await this.prisma.guestOptions.findMany({
      select: { option: true },
      where: { guest_id: guest_id, server_id: this.server_id },
    });

    return guest_options.map((guest_option) => guest_option.option);
  }

  async add_guest(guest_input_data: GuestInputModel) {
    return this.prisma.guest
      .create({
        data: {
          server_id: this.server_id,
          first_name: guest_input_data.first_name,
          last_name: guest_input_data.last_name,
          anonymous: guest_input_data.anonymous,
          guest_options: {
            createMany: {
              data: guest_input_data.option_ids.map((option_id) => ({
                option_id: option_id,
                server_id: this.server_id,
              })),
            },
          },
        },
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        if (error.code === 'P2002') {
          throw new ConflictException('Guest already exists.');
        } else {
          throw new InternalServerErrorException(
            'Could not create guest. Try again later.',
          );
        }
      });
  }
}
