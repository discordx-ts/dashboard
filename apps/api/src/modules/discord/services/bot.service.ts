import { ConfigKeys, ConfigService } from "../../config/config.service";
import { GuildModel } from "../models/guild.model";
import { REST } from "@discordjs/rest";
import { BadRequestException, Injectable } from "@nestjs/common";
import { APIGuild, Routes } from "discord-api-types/v10";

@Injectable()
export class BotService {
  private rest: REST;

  constructor(private configService: ConfigService) {
    this.rest = new REST({ version: "10", authPrefix: "Bot" }).setToken(
      configService.get(ConfigKeys.DISCORD_BOT_TOKEN),
    );
  }

  async getGuilds() {
    const guilds = (await this.rest.get(Routes.guilds())) as APIGuild[];
    return guilds.map((guild) => new GuildModel(guild, this));
  }

  async getGuild(id: string) {
    try {
      const data = (await this.rest.get(Routes.guild(id))) as APIGuild;
      return new GuildModel(data, this);
    } catch (err) {
      throw new BadRequestException(
        "Please ensure that you invite the bot to your guild before proceeding.",
      );
    }
  }
}
