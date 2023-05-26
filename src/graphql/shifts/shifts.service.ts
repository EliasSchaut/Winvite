import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { CtxType } from '@/types/common/ctx.type';
import { ShiftModel } from '@/types/models/shift.model';
import { SlotsModel } from '@/types/models/slots.model';
import { GraphQLError } from 'graphql/error';
import { NameModel } from '@/types/models/name.model';

@Injectable()
export class ShiftsService {
  constructor(private readonly prisma: PrismaService) {}

  async find_all_shifts(ctx: CtxType): Promise<ShiftModel[]> {
    return (
      await this.prisma.shifts.findMany({
        where: { server_id: ctx.server_id },
        select: {
          id: true,
          shift_info: {
            where: { lang: ctx.i18n.lang },
            select: { name: true, desc: true },
          },
        },
        orderBy: { id: 'asc' },
      })
    ).map((shift) => {
      return {
        id: shift.id,
        name: shift.shift_info[0].name,
        desc: shift.shift_info[0].desc,
        slots: [],
      };
    });
  }

  async find_all_slots(shift_id: number, ctx: CtxType): Promise<SlotsModel[]> {
    const shift = await this.prisma.shifts.findFirst({
      where: { id: shift_id },
      select: {
        shift_slots: {
          select: {
            id: true,
            start: true,
            end: true,
            num_of_participants: true,
            guest_shifts: {
              select: { id: true },
            },
          },
          orderBy: { id: 'asc' },
        },
      },
      orderBy: { id: 'asc' },
    });
    if (!shift) {
      throw new GraphQLError(ctx.i18n.t('shifts.invalid.without_slots'), {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    return shift.shift_slots.map((slot) => {
      return {
        id: slot.id,
        start: slot.start,
        end: slot.end,
        num_of_participants: slot.num_of_participants,
        free_spots: slot.num_of_participants - slot.guest_shifts.length,
      };
    });
  }

  async find_all_acquired_from_guests(
    slot_id: number,
    ctx: CtxType,
  ): Promise<NameModel[]> {
    const data = (
      await this.prisma.guestShifts.findMany({
        where: { shift_slot_id: slot_id },
        select: {
          guest: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      })
    ).map((guest) => {
      return {
        first_name: guest.guest.first_name,
        last_name: guest.guest.last_name,
      };
    });
    console.log(data);
    return data;
  }
}
