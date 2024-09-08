import { Module } from "@nestjs/common";

import { ConfigModule } from "../config/config.module";
import { DiscordGuildsController } from "./controllers/guilds.controller";
import { DiscordMeController } from "./controllers/me.controller";
import { BotService } from "./services/bot.service";

@Module({
  imports: [ConfigModule],
  providers: [BotService],
  controllers: [DiscordGuildsController, DiscordMeController],
  exports: [BotService],
})
export class DiscordModule {}
