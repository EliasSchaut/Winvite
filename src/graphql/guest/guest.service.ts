import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { GuestInputModel } from '@/types/models/inputs/guest.input';
import { Prisma } from '@prisma/client';
import { GuestModel } from '@/types/models/guest.model';
import { GraphQLError } from 'graphql/error';
import { GuestUpdateInputModel } from '@/types/models/inputs/guest_update.input';
import { CtxType } from '@/types/common/ctx.type';
import { OptionModel } from '@/types/models/option.model';
import { SlotsModel } from '@/types/models/slots.model';

@Injectable()
export class GuestService {
  constructor(private readonly prisma: PrismaService) {}

  async find_by_id(ctx: CtxType): Promise<GuestModel | null> {
    return this.prisma.guest.findUnique({
      where: { id: ctx.guest_id },
    });
  }

  async find_all(ctx: CtxType): Promise<GuestModel[]> {
    return this.prisma.guest.findMany({
      where: { server_id: ctx.server_id },
      orderBy: { first_name: 'asc' },
    });
  }

  async find_options_by_guest(
    guest_id: number,
    ctx: CtxType,
  ): Promise<OptionModel[]> {
    const guest_options = await this.prisma.guestOptions.findMany({
      select: {
        option: {
          select: {
            id: true,
            name: true,
            options_info: {
              select: { warning: true, label: true },
              where: { lang: ctx.i18n.lang },
            },
          },
        },
      },
      where: { guest_id: guest_id },
    });

    return guest_options.map((option) => {
      return {
        id: option.option.id,
        name: option.option.name,
        warning: option.option.options_info[0].warning,
        label: option.option.options_info[0].label,
      };
    });
  }

  async find_shifts_by_guest(
    guest_id: number,
    ctx: CtxType,
  ): Promise<SlotsModel[]> {
    const shift = await this.prisma.guest.findUnique({
      where: { id: guest_id },
      select: {
        guest_shifts: {
          select: {
            shift_slot: {
              select: {
                id: true,
                start: true,
                end: true,
              },
            },
          },
        },
      },
    });
    if (!shift) {
      throw new GraphQLError(ctx.i18n.t('auth.invalid.token'), {
        extensions: { code: 'UNAUTHORIZED' },
      });
    }
    return shift.guest_shifts.map((shift) => {
      return {
        id: shift.shift_slot.id,
        start: shift.shift_slot.start,
        end: shift.shift_slot.end,
      };
    });
  }

  async add_guest(guest_input_data: GuestInputModel, ctx: CtxType) {
    return this.prisma.guest
      .create({
        data: {
          server_id: ctx.server_id,
          first_name: guest_input_data.first_name,
          last_name: guest_input_data.last_name,
          anonymous: guest_input_data.anonymous,
          guest_options: {
            createMany: {
              data: guest_input_data.option_ids.map((option_id) => ({
                option_id: option_id,
              })),
            },
          },
        },
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        if (error.code === 'P2002') {
          throw new GraphQLError(ctx.i18n.t('guests.invalid.duplication'), {
            extensions: { code: 'CONFLICT' },
          });
        } else {
          throw new GraphQLError(ctx.i18n.t('guests.invalid.internal.create'), {
            extensions: { code: 'INTERNAL_SERVER_ERROR' },
          });
        }
      });
  }

  async update_guest(guest_update_data: GuestUpdateInputModel, ctx: CtxType) {
    if (guest_update_data.option_ids) {
      (guest_update_data as Prisma.GuestUpdateInput).guest_options = {
        deleteMany: { guest_id: ctx.guest_id },
        createMany: {
          data: guest_update_data.option_ids.map((option_id) => ({
            option_id: option_id,
          })),
        },
      };
      delete guest_update_data.option_ids;
    }

    if (guest_update_data.shift_slot_ids) {
      (guest_update_data as Prisma.GuestUpdateInput).guest_shifts = {
        deleteMany: { guest_id: ctx.guest_id },
        createMany: {
          data: guest_update_data.shift_slot_ids.map((shift_slot_id) => ({
            shift_slot_id: shift_slot_id,
          })),
        },
      };
      delete guest_update_data.shift_slot_ids;
    }

    return this.prisma.guest
      .update({
        where: { id: ctx.guest_id },
        data: guest_update_data,
      })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        console.log(error);
        if (error.code === 'P2002') {
          throw new GraphQLError(ctx.i18n.t('guests.invalid.duplication'), {
            extensions: { code: 'CONFLICT' },
          });
        } else if (error.code === 'P2003') {
          throw new GraphQLError(ctx.i18n.t('options.invalid.not_found'), {
            extensions: { code: 'NOT_FOUND' },
          });
        } else {
          throw new GraphQLError(ctx.i18n.t('guests.invalid.internal.update'), {
            extensions: { code: 'INTERNAL_SERVER_ERROR' },
          });
        }
      });
  }

  async delete_guest(ctx: CtxType) {
    return this.prisma.guest.delete({
      where: { id: ctx.guest_id },
    });
  }
}
