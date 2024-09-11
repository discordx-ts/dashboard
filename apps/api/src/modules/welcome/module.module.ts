import { Module } from "@nestjs/common";

import { DiscordModule } from "../discord/discord.module.js";
import { WelcomeController } from "./controllers/welcome.controller.js";

@Module({
  imports: [DiscordModule],
  providers: [],
  controllers: [WelcomeController],
  exports: [],
})
export class WelcomeModule {}
