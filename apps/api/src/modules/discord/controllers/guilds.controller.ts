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

@Controller("guilds")
export class DiscordGuildsController {
  constructor(private bot: BotService) {}

  @Get(":server")
  @UseGuards(AuthGuard("jwt"))
  async guild(@Param("server") server: string, @Req() { user }: AuthRequest) {
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
     * Return guild
     */

    return guild;
  }

  @Get(":server/channels")
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

  @Get(":server/roles")
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

  @Get(":server/members")
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
