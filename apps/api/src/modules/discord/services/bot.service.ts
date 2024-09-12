import { REST } from "@discordjs/rest";
import { BadRequestException, Injectable } from "@nestjs/common";
import {
  APIGuild,
  APIGuildChannel,
  APIGuildMember,
  APIRole,
  GuildChannelType,
  Routes,
} from "discord-api-types/v10";
import { URLSearchParams } from "url";

import { ConfigKeys, ConfigService } from "../../config/config.service.js";
import { Guild } from "../structures/guild.model.js";

@Injectable()
export class BotService {
  private rest: REST;

  constructor(configService: ConfigService) {
    this.rest = new REST({ version: "10", authPrefix: "Bot" }).setToken(
      configService.get(ConfigKeys.DISCORD_BOT_TOKEN),
    );
  }

  async getGuilds() {
    const guilds = await this.rest
      .get(Routes.guilds())
      .then((r) => r as APIGuild[]);

    return guilds.map((guild) => new Guild(guild, this));
  }

  async getGuild(guildId: string) {
    try {
      const query = new URLSearchParams();
      query.set("with_counts", "true");

      const data = await this.rest
        .get(Routes.guild(guildId), {
          query,
        })
        .then((r) => r as APIGuild);

      return new Guild(data, this);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new BadRequestException(
        "Please ensure that you invite the bot to your guild before proceeding.",
      );
    }
  }

  async getChannel(channelId: string) {
    const channels = (await this.rest.get(
      Routes.channel(channelId),
    )) as APIGuildChannel<GuildChannelType>;

    return channels;
  }

  async getChannels(guildId: string) {
    const channels = (await this.rest.get(
      Routes.guildChannels(guildId),
    )) as APIGuildChannel<GuildChannelType>[];

    return channels;
  }

  async getRole(guildId: string, roleId: string) {
    const channels = (await this.rest.get(
      Routes.guildRole(guildId, roleId),
    )) as APIRole;

    return channels;
  }

  async getRoles(guildId: string) {
    const channels = (await this.rest.get(
      Routes.guildRoles(guildId),
    )) as APIRole[];

    return channels;
  }

  async getMember(guildId: string, memberId: string) {
    const channels = (await this.rest.get(
      Routes.guildMember(guildId, memberId),
    )) as APIGuildMember;

    return channels;
  }

  async getMembers(guildId: string, limit = 1, after = 0) {
    const query = new URLSearchParams();
    query.set("limit", limit.toString());
    query.set("after", after.toString());
    const channels = (await this.rest.get(Routes.guildMembers(guildId), {
      query,
    })) as APIGuildMember[];

    return channels;
  }
}
