import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { AuthRequest } from "../../../shared/interfaces/express";
import { BotService } from "../services/bot.service";

@Controller("@me")
export class DiscordMeController {
  constructor(private bot: BotService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  me(@Req() { user }: AuthRequest) {
    /**
     * Get and return user @me
     */
    return user.getMe();
  }

  @Get("guilds")
  @UseGuards(AuthGuard("jwt"))
  async guilds(@Req() { user }: AuthRequest) {
    /**
     * Get and return user guilds
     */
    return user.getGuilds();
  }

  @Get("guilds/:server")
  @UseGuards(AuthGuard("jwt"))
  async guild(@Param("server") server: string, @Req() { user }: AuthRequest) {
    /**
     * Get and return user guild
     */
    return user.getGuild(server);
  }
}
