import { Module } from "@nestjs/common";

import { ConfigModule } from "../config/config.module.js";
import { DiscordGuildsController } from "./controllers/guilds.controller.js";
import { DiscordMeController } from "./controllers/me.controller.js";
import { BotService } from "./services/bot.service.js";

@Module({
  imports: [ConfigModule],
  providers: [BotService],
  controllers: [DiscordGuildsController, DiscordMeController],
  exports: [BotService],
})
export class DiscordModule {}
