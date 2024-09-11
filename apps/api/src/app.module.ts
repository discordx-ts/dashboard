import { Module } from "@nestjs/common";

import { AuthModule } from "./modules/auth/auth.module.js";
import { ConfigModule } from "./modules/config/config.module.js";
import { DiscordModule } from "./modules/discord/discord.module.js";
import { WelcomeModule } from "./modules/welcome/module.module.js";

@Module({
  imports: [AuthModule, ConfigModule, DiscordModule, WelcomeModule],
})
export class AppModule {}
