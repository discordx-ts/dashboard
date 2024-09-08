import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

import { AuthRequest } from "../../../shared/interfaces/express";
import { ConfigKeys, ConfigService } from "../../config/config.service";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get("discord")
  @UseGuards(AuthGuard("discord"))
  async discordLogin() {
    // Initiates the OAuth2 login flow
  }

  @Get("discord/callback")
  @UseGuards(AuthGuard("discord"))
  discordLoginCallback(@Req() req: AuthRequest, @Res() res: Response) {
    const jwt = this.authService.login(req.user);
    res.redirect(
      `${this.configService.get(ConfigKeys.DISCORD_LOGIN_REDIRECT)}?token=${jwt.access_token}`,
    );
  }
}
