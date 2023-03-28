import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import cuid from "cuid";
import { I18nContext } from "nestjs-i18n";
import { Prisma, User } from "@prisma/client";

import { UserDBService } from "@/common/db/users/userDB.service";
import { PasswordService } from "@/common/util/password.service";
import { EmailService } from "@/common/util/email.service";
import { GravatarService } from "@/common/util/gravatar.service";
import { ProfileDto } from "@/types/user/profile.dto";
import { name_pattern } from "@/common/validation/patterns/name.pattern";
import { username_pattern } from "@/common/validation/patterns/username.pattern";
import { password_pattern } from "@/common/validation/patterns/password.pattern";
import { I18nTranslations } from "@/types/generated/i18n.generated";
import { UserSlimType } from "@/types/user/user_slim.type";

@Injectable()
export class UserService {

  constructor(private readonly userDBService: UserDBService,private readonly passwordService: PasswordService,
              private readonly emailService: EmailService,
              private readonly gravatarService: GravatarService) {}

  async get(user_id: number): Promise<UserSlimType> {
    const { password, verified, challenge, pw_reset, ...result } = await this.userDBService.get({ id: user_id }) as User;
    return result
  }

  async get_public(user_id: number) {
    const { name, gravatar_url, use_gravatar } = await this.userDBService.get({ id: user_id }) as User;
    return { name, gravatar_url, use_gravatar };
  }

  async get_user_data(user_id: number) {
    const user = await this.userDBService.get({ id: user_id }) as User;
    return { user };
  }

  async change_profile(user_id: number, data: ProfileDto, i18n: I18nContext<I18nTranslations>) {
    if (!name_pattern.test(data.name)) {
      throw new ForbiddenException(i18n.t("user.exception.invalid_name"));
    }

    const user = await this.userDBService.get({ id: user_id }) as User;
    const data_to_update = {
      name: data.name
    } as Prisma.UserUpdateInput;

    if (data.hasOwnProperty("use_gravatar") && data.use_gravatar) {
      data_to_update["use_gravatar"] = true;
      data_to_update["gravatar_url"] = this.gravatarService.generate_gravatar_url(user.username);

    } else {
      data_to_update["use_gravatar"] = false;
      data_to_update["gravatar_url"] = "";
    }

    await this.userDBService.update({ where: { id: user_id }, data: data_to_update });
    return { message: i18n.t("user.success.profile"), show_alert: true };
  }

  async email_opt_in(user_id: number, opt_in: boolean, i18n: I18nContext<I18nTranslations>) {
    await this.userDBService.update({ where: { id: user_id },
      data: {
        email_opt_in: opt_in
      }
    });
    return { message: i18n.t("user.success.email_opt_in"), show_alert: true };
  }

  async change_password(user_id: number, password_new: string, password_old: string, i18n: I18nContext<I18nTranslations>) {
    if (!password_pattern.test(password_new)) {
      throw new ForbiddenException(i18n.t("user.exception.invalid_password"));
    }

    const user = await this.userDBService.get({ id: user_id }) as User;
    if (await this.passwordService.compare(password_old, user.password)) {
      await this.userDBService.update({ where: { id: user_id },
        data: {
          password: await this.passwordService.hash(password_new),
        }
      });
      return { message: i18n.t("user.success.password"), show_alert: true };

    } else {
      throw new ForbiddenException(i18n.t("user.exception.forbidden_password"));
    }
  }

  async change_username(user_id: number, new_username: string, password: string, i18n: I18nContext<I18nTranslations>) {
    if (!username_pattern.test(new_username)) {
      throw new ForbiddenException(i18n.t("user.exception.invalid_username"));
    }

    const user = await this.userDBService.get({ id: user_id }) as User;
    if ((user.username === new_username) || (await this.userDBService.has_user(new_username))) {
      throw new ConflictException(i18n.t("user.exception.conflict_username"));
    }

    if (await this.passwordService.compare(password, user.password)) {
      const new_challenge = cuid();
      await this.userDBService.update({ where: { id: user_id },
        data: {
          username: new_username,
          verified: false,
          challenge: new_challenge,
          gravatar_url: this.gravatarService.generate_gravatar_url(new_username)
        }
      });
      const new_challenge_url = this.emailService.generate_challenge_url(new_challenge);
      await this.emailService.send_challenge(user.username, user.name, new_challenge_url);
      return { message: i18n.t("user.success.username"), show_alert: true };

    } else {
      throw new ForbiddenException(i18n.t("user.exception.forbidden_password"));
    }
  }

  async delete(user_id: number, password: string, i18n: I18nContext<I18nTranslations>) {
    const user = await this.userDBService.get({ id: user_id }) as User;
    if (await this.passwordService.compare(password, user.password)) {
      await this.userDBService.delete({ id: user_id });
      return { message: i18n.t("user.success.delete"), show_alert: true };

    } else {
      throw new ForbiddenException(i18n.t("user.exception.forbidden_password"));
    }
  }
}
