import { Controller, Get, UseGuards, Post, Delete, Param, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";

import { JwtAuthGuard } from '@/routes/auth/jwt-auth.guard';
import { UserService } from "@/routes/user/user.service";
import { User } from "@/common/decorators/user.decorator";
import { JwtUser } from "@/types/user/user_jwt.type";
import { ProfileDto } from "@/types/user/profile.dto";
import { EmailOptInDto } from "@/types/user/email_opt_in.dto";
import { PasswordDto } from "@/types/user/password.dto";
import { LoginDto } from "@/types/user/login.dto";
import { PasswordNewDto } from "@/types/user/password_new.dto";
import { ResDto } from "@/types/common/res.dto";
import { I18nTranslations } from "@/types/generated/i18n.generated";

/**
 * Controller for user related routes
 */
@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'GET user data' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@User() user: JwtUser) {
    return await this.userService.get(user.id);
  }

  @ApiOperation({ summary: 'GET user id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('id')
  async get_id(@User() user: JwtUser): Promise<JwtUser> {
    return { id: user.id };
  }

  @ApiOperation({ summary: 'POST update profile information (name, gravatar)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async update_profile(@User() user: JwtUser, @Body() body: ProfileDto, @I18n() i18n: I18nContext<I18nTranslations>): Promise<ResDto> {
    return await this.userService.change_profile(user.id, body, i18n);
  }

  @ApiOperation({ summary: 'POST update email_opt_in (set/unset on newsletter)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('email_opt_in')
  async email_opt_in(@User() user: JwtUser, @Body() body: EmailOptInDto, @I18n() i18n: I18nContext<I18nTranslations>): Promise<ResDto> {
    return await this.userService.email_opt_in(user.id, Boolean(body.email_opt_in), i18n);
  }

  @ApiOperation({ summary: 'DELETE user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@User() user: JwtUser, @Body() body: PasswordDto, @I18n() i18n: I18nContext<I18nTranslations>): Promise<ResDto> {
    return await this.userService.delete(user.id, body.password, i18n);
  }

  @ApiOperation({ summary: 'GET all saved user data' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('data')
  async get_data(@User() user: JwtUser) {
    return await this.userService.get_user_data(user.id);
  }

  @ApiOperation({ summary: 'POST update username (email)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('username')
  async change_username(@User() user: JwtUser, @Body() body: LoginDto, @I18n() i18n: I18nContext<I18nTranslations>): Promise<ResDto> {
    return await this.userService.change_username(user.id, body.username, body.password, i18n);
  }

  @ApiOperation({ summary: 'POST update password' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('password')
  async change_password(@User() user: JwtUser, @Body() body: PasswordNewDto, @I18n() i18n: I18nContext<I18nTranslations>): Promise<ResDto> {
    return await this.userService.change_password(user.id, body.password, body.password_old, i18n);
  }

  @ApiOperation({ summary: 'GET check if bearer token is valid' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('check')
  async check_profile() {
    return true;
  }

  @ApiOperation({ summary: 'GET public user data from given user_id' })
  @Get(':user_id')
  async get_user(@Param('user_id') user_id: string) {
    return await this.userService.get_public(Number(user_id));
  }
}
