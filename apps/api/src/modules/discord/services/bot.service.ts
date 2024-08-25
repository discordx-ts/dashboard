import { ConfigKeys, ConfigService } from "../../config/config.service";
import { GuildModel } from "../models/guild.model";
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

  async getGuild(guildId: string) {
    try {
      const data = (await this.rest.get(Routes.guild(guildId))) as APIGuild;
      return new GuildModel(data, this);
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

  async getMembers(guildId: string, limit: number = 1, after: number = 0) {
    const query = new URLSearchParams();
    query.set("limit", limit.toString());
    query.set("after", after.toString());
    const channels = (await this.rest.get(Routes.guildMembers(guildId), {
      query,
    })) as APIGuildMember[];

    return channels;
  }
}
