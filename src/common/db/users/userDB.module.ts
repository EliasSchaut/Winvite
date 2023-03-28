import { Module } from '@nestjs/common';
import { UserDBService } from "@/common/db/users/userDB.service";
import { PrismaService } from "@/common/db/prisma.service";
import { PasswordService } from "@/common/util/password.service";

@Module({
  providers: [UserDBService, PrismaService, PasswordService],
  exports: [UserDBService],
})
export class UserDBModule {}
