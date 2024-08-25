import { AuthRequest } from "../../../shared/interfaces/express";
import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { APIGuild, Routes } from "discord-api-types/v10";

@Controller("discord")
export class DiscordController {
  constructor() {}

  @Get("@me")
  @UseGuards(AuthGuard("jwt"))
  me(@Req() req: AuthRequest) {
    return req.user.rest.get(Routes.user());
  }

  @Get("guilds")
  @UseGuards(AuthGuard("jwt"))
  async guilds(@Req() req: AuthRequest) {
    const guilds = (await req.user.rest.get(Routes.userGuilds())) as APIGuild[];
    return guilds.filter((g) => g.owner);
  }

  @Get("/guilds/:server")
  @UseGuards(AuthGuard("jwt"))
  async guild(@Param("server") server: string, @Req() req: AuthRequest) {
    return req.user.getGuild(server);
  }
}
