import { AuthRequest } from "../../../shared/interfaces/express";
import { PrismaService } from "../../prisma/services/prisma.service";
import { WelcomeGoodbyeDto } from "../dto/welcome-goodbye.dto";
import {
  Body,
  Controller,
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
  constructor(private prisma: PrismaService) {}

  @Get()
  async get(@Param("server") server: string, @Req() req: AuthRequest) {
    const guild = await req.user.getGuild(server);
    let data = await this.prisma.moduleMessage.findFirst({
      where: { guildId: guild.id },
    });

    if (!data) {
      data = await this.prisma.moduleMessage.create({
        data: {
          guildId: guild.id,
          goodbyeMessage: "{user} has left the server",
          welcomeMessage: "{user} has joined the server",
        },
      });
    }

    return data;
  }

  @Patch()
  async update(
    @Param("server") server: string,
    @Body() payload: WelcomeGoodbyeDto,
    @Req() req: AuthRequest,
  ) {
    const guild = await req.user.getGuild(server);
    await this.prisma.moduleMessage.update({
      where: { guildId: guild.id },
      data: payload,
    });
  }
}
