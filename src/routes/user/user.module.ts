import { Module } from '@nestjs/common';
import { UserController } from '@/routes/user/user.controller';
import { UserService } from "@/routes/user/user.service";
import { UserDBModule } from "@/common/db/users/userDB.module";
import { PasswordService } from "@/common/util/password.service";
import { EmailService } from "@/common/util/email.service";
import { GravatarService } from "@/common/util/gravatar.service";

@Module({
  imports: [UserDBModule],
  controllers: [UserController],
  providers: [UserService, PasswordService, EmailService, GravatarService],
})
export class UserModule {}
