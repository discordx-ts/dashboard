import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { AuthRequest } from "../../../shared/interfaces/express";
import { MembersQueryDto } from "../dto/members-query.dto";
import { BotService } from "../services/bot.service";

@Controller("discord")
export class DiscordController {
  constructor(private bot: BotService) {}

  @Get("@me")
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

  @Get("/guilds/:server")
  @UseGuards(AuthGuard("jwt"))
  async guild(@Param("server") server: string, @Req() { user }: AuthRequest) {
    /**
     * Get and return user guild
     */
    return user.getGuild(server);
  }

  @Get("/guilds/:server/channels")
  @UseGuards(AuthGuard("jwt"))
  async channels(
    @Param("server") server: string,
    @Req() { user }: AuthRequest,
  ) {
    /**
     * Get the guild
     */
    const guild = await this.bot.getGuild(server);

    /**
     * Make sure user has access to guild
     */
    if (!guild.isOwner(user.discordId)) {
      throw new ForbiddenException();
    }

    /**
     * Return guild channels
     */
    return guild.getChannels();
  }

  @Get("/guilds/:server/roles")
  @UseGuards(AuthGuard("jwt"))
  async roles(@Param("server") server: string, @Req() { user }: AuthRequest) {
    /**
     * Get the guild
     */
    const guild = await this.bot.getGuild(server);

    /**
     * Make sure user has access to guild
     */
    if (!guild.isOwner(user.discordId)) {
      throw new ForbiddenException();
    }

    /**
     * Return guild roles
     */
    return guild.getRoles();
  }

  @Get("/guilds/:server/members")
  @UseGuards(AuthGuard("jwt"))
  async members(
    @Param("server") server: string,
    @Query() { limit, after }: MembersQueryDto,
    @Req() { user }: AuthRequest,
  ) {
    /**
     * Get the guild
     */
    const guild = await this.bot.getGuild(server);

    /**
     * Make sure user has access to guild
     */
    if (!guild.isOwner(user.discordId)) {
      throw new ForbiddenException();
    }

    /**
     * Return guild members
     */
    return guild.getMembers(limit, after);
  }
}
