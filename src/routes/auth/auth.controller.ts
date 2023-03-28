import { Controller, Post, UseGuards, Get, Param, Body } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";

import { LocalAuthGuard } from '@/routes/auth/auth.guard';
import { AuthService } from '@/routes/auth/auth.service';
import { JwtUser } from "@/types/user/user_jwt.type";
import { User } from "@/common/decorators/user.decorator";
import { PasswordDto } from "@/types/user/password.dto";
import { RegisterDto } from "@/types/user/register.dto";
import { ResDto } from "@/types/common/res.dto";
import { LoginDto } from "@/types/user/login.dto";
import { I18nTranslations } from "@/types/generated/i18n.generated";

/**
 * Controller for authentication related routes
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'POST issue jwt access token by providing username (email) and password' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: JwtUser, @Body() body: LoginDto): Promise<{access_token: string}> {
    return await this.authService.login(user);
  }

  @ApiOperation({ summary: 'POST register new user' })
  @Post('register')
  async register(@Body() body: RegisterDto, @I18n() i18n: I18nContext<I18nTranslations>): Promise<ResDto> {
    return await this.authService.register(body, i18n)
  }

  @ApiOperation({ summary: 'GET confirm email address by providing user challenge' })
  @Get('confirm/:challenge')
  async confirm(@Param('challenge') challenge: string, @I18n() i18n: I18nContext<I18nTranslations>): Promise<ResDto> {
    return await this.authService.confirm(challenge, i18n)
  }

  @ApiOperation({ summary: 'GET request a password reset by providing an username (email)' })
  @Get('reset/:username')
  async pw_reset_request(@Param('username') username: string, @I18n() i18n: I18nContext<I18nTranslations>): Promise<ResDto> {
    return await this.authService.pw_reset_request(username, i18n)
  }

  @ApiOperation({ summary: 'POST reset password by providing user challenge and new password' })
  @Post('reset/:challenge')
  async pw_reset(@Param('challenge') challenge: string, @Body() body: PasswordDto, @I18n() i18n: I18nContext<I18nTranslations>): Promise<ResDto> {
    return await this.authService.pw_reset(challenge, body.password, i18n)
  }
}
