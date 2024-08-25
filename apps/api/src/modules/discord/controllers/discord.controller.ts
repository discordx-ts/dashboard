import { AuthRequest } from "../../../shared/interfaces/express";
import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("discord")
export class DiscordController {
  constructor() {}

  @Get("@me")
  @UseGuards(AuthGuard("jwt"))
  me(@Req() { user }: AuthRequest) {
    return user.getMe();
  }

  @Get("guilds")
  @UseGuards(AuthGuard("jwt"))
  async guilds(@Req() { user }: AuthRequest) {
    return user.getGuilds();
  }

  @Get("/guilds/:server")
  @UseGuards(AuthGuard("jwt"))
  async guild(@Param("server") server: string, @Req() { user }: AuthRequest) {
    return user.getGuild(server);
  }
}
