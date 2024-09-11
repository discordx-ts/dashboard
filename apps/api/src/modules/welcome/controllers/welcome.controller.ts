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
import { welcomes } from "@workspace/repo";

import { AuthRequest } from "../../../shared/interfaces/express.js";
import { BotService } from "../../discord/services/bot.service.js";
import { WelcomeDto } from "../dto/welcome.dto.js";

@Controller("welcome/:server")
@UseGuards(AuthGuard("jwt"))
export class WelcomeController {
  constructor(private bot: BotService) {}

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
    let data = await welcomes.getByGuildId(guild.id);

    /**
     * Create payload if not exist in database
     */
    if (!data) {
      /**
       * Make sure system channel exists
       */

      if (!guild.system_channel_id) {
        throw new BadRequestException(
          "The system channel is not configured. Please navigate to the Discord server settings and set it up",
        );
      }

      /**
       * Create database record
       */
      data = await welcomes.create({
        channelId: guild.system_channel_id,
        guildId: guild.id,
        goodbyeMessage: "{user} has left the server",
        welcomeMessage: "{user} has joined the server",
        isWelcomeEnabled: true,
        isGoodbyeEnabled: true,
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
    await welcomes.update(guild.id, payload);
  }
}
