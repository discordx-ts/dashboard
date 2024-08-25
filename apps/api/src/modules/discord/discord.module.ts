import { DiscordController } from "./controllers/discord.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  providers: [],
  controllers: [DiscordController],
  exports: [],
})
export class DiscordModule {}
