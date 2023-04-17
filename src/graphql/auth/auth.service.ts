import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModel } from '@/types/models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async sign_in(challenge: string): Promise<AuthModel> {
    const guest = await this.prisma.guest.findUnique({
      select: { id: true },
      where: { challenge: challenge },
    });

    if (guest === null) {
      throw new UnauthorizedException();
    }

    const payload = { username: guest.id, sub: null };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
