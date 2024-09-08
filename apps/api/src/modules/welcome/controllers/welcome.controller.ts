import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { AuthRequest } from "../../../shared/interfaces/express";
import { BotService } from "../../discord/services/bot.service";
import { PrismaService } from "../../prisma/services/prisma.service";
import { WelcomeDto } from "../dto/welcome.dto";

@Controller("welcome/:server")
@UseGuards(AuthGuard("jwt"))
export class WelcomeController {
  constructor(
    private prisma: PrismaService,
    private bot: BotService,
  ) {}

  @Get()
  async get(@Param("server") server: string, @Req() { user }: AuthRequest) {
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
     * Get payload for guild
     */
    let data = await this.prisma.welcome.findFirst({
      where: { guildId: guild.id },
    });

    /**
     * Make sure system channel exists
     */

    if (!guild.system_channel_id) {
      throw new BadRequestException(
        "The system channel is not configured. Please navigate to the Discord server settings and set it up",
      );
    }

    /**
     * Create payload if not exist in database
     */
    if (!data) {
      data = await this.prisma.welcome.create({
        data: {
          channelId: guild.system_channel_id,
          guildId: guild.id,
          goodbyeMessage: "{user} has left the server",
          welcomeMessage: "{user} has joined the server",
        },
      });
    }

    /**
     * Return the payload
     */
    return data;
  }

  @Patch()
  async update(
    @Param("server") server: string,
    @Body() payload: WelcomeDto,
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
     * Update the payload
     */
    await this.prisma.welcome.update({
      where: { guildId: guild.id },
      data: payload,
    });
  }
}
