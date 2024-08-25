import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from "./modules/config/config.module";
import { DiscordModule } from "./modules/discord/discord.module";
import { ModuleModule } from "./modules/module/module.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { UserModule } from "./modules/user/user.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    DiscordModule,
    ModuleModule,
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
