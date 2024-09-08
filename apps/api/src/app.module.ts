import { Module } from "@nestjs/common";

import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from "./modules/config/config.module";
import { DiscordModule } from "./modules/discord/discord.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UserModule } from "./modules/user/user.module";
import { WelcomeModule } from "./modules/welcome/module.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    DiscordModule,
    WelcomeModule,
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
