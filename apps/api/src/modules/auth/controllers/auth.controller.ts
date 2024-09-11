import {
  ArgumentsHost,
  Catch,
  Controller,
  ExceptionFilter,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

import { AuthRequest } from "../../../shared/interfaces/express.js";
import { ConfigKeys, ConfigService } from "../../config/config.service.js";
import { AuthService } from "../services/auth.service.js";

@Catch()
@Injectable()
export class CallbackExceptionFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {
    //
  }

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.BAD_REQUEST;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    const redirectURL = this.configService.get(
      ConfigKeys.DISCORD_LOGIN_FAILURE_REDIRECT,
    );
    response.status(status).redirect(redirectURL);
  }
}

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
  @UseFilters(CallbackExceptionFilter)
  @UseGuards(AuthGuard("discord"))
  discordLoginCallback(@Req() req: AuthRequest, @Res() res: Response) {
    const jwt = this.authService.login(req.user);
    res.redirect(
      `${this.configService.get(ConfigKeys.DISCORD_LOGIN_SUCCESS_REDIRECT)}?token=${jwt.access_token}`,
    );
  }
}
