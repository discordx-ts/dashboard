import { Module } from "@nestjs/common";

import { DiscordModule } from "../discord/discord.module";
import { PrismaModule } from "../prisma/prisma.module";
import { WelcomeController } from "./controllers/welcome.controller";

@Module({
  imports: [DiscordModule, PrismaModule],
  providers: [],
  controllers: [WelcomeController],
  exports: [],
})
export class WelcomeModule {}
