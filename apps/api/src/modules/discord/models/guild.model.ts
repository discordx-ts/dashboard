import { BotService } from "../services/bot.service";
import { APIGuild } from "discord-api-types/v10";

export class GuildModel {
  id: string;

  constructor(
    public data: APIGuild,
    private bot: BotService,
  ) {
    Object.assign(this, data);
  }

  isOwner(id: string) {
    return this.data.owner_id === id;
  }
}
