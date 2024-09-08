import { Module } from "@nestjs/common";

import { DiscordModule } from "../discord/discord.module";
import { PrismaModule } from "../prisma/prisma.module";
import { WelcomeGoodbyeModuleController } from "./controllers/welcome-goodbye.controller";

@Module({
  imports: [DiscordModule, PrismaModule],
  providers: [],
  controllers: [WelcomeGoodbyeModuleController],
  exports: [],
})
export class ModuleModule {}
