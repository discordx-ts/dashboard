import { APIGuild } from "discord-api-types/v10";

import { BotService } from "../services/bot.service";

export class GuildModel {
  id: string;

  constructor(
    private data: APIGuild,
    private bot: BotService,
  ) {
    Object.assign(this, data);
  }

  isOwner(id: string) {
    return this.data.owner_id === id;
  }

  getChannels() {
    return this.bot.getChannels(this.id);
  }

  getRole(roleId: string) {
    return this.bot.getRole(this.id, roleId);
  }

  getRoles() {
    return this.bot.getRoles(this.id);
  }

  getMember(memberId: string) {
    return this.bot.getMember(this.id, memberId);
  }

  getMembers(limit = 1, after = 0) {
    return this.bot.getMembers(this.id, limit, after);
  }
}
