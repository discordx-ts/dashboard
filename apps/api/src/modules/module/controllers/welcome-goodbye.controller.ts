import { AuthRequest } from "../../../shared/interfaces/express";
import { BotService } from "../../discord/services/bot.service";
import { PrismaService } from "../../prisma/services/prisma.service";
import { WelcomeGoodbyeDto } from "../dto/welcome-goodbye.dto";
import {
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

@Controller("module/:server/welcome-goodbye")
@UseGuards(AuthGuard("jwt"))
export class WelcomeGoodbyeModuleController {
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
    let data = await this.prisma.moduleMessage.findFirst({
      where: { guildId: guild.id },
    });

    /**
     * Create payload if not exist in database
     */
    if (!data) {
      data = await this.prisma.moduleMessage.create({
        data: {
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
    @Body() payload: WelcomeGoodbyeDto,
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
    await this.prisma.moduleMessage.update({
      where: { guildId: guild.id },
      data: payload,
    });
  }
}
