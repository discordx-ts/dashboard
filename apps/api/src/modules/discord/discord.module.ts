import { ConfigModule } from "../config/config.module";
import { DiscordController } from "./controllers/discord.controller";
import { BotService } from "./services/bot.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [ConfigModule],
  providers: [BotService],
  controllers: [DiscordController],
  exports: [BotService],
})
export class DiscordModule {}
