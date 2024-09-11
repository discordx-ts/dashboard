import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@workspace/repo";
import { Profile, Strategy } from "passport-discord";

import { ConfigKeys, ConfigService } from "../../config/config.service.js";
import { AuthService } from "../services/auth.service.js";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, "discord") {
  constructor(
    private authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.get(ConfigKeys.DISCORD_CLIENT_ID),
      clientSecret: configService.get(ConfigKeys.DISCORD_CLIENT_SECRET),
      callbackURL: configService.get(ConfigKeys.DISCORD_CALLBACK_URL),
      scope: [
        "identify",
        "email",
        "guilds",
        "applications.commands.permissions.update",
      ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<User> {
    const user = await this.authService.validateDiscordUser(
      accessToken,
      refreshToken,
      profile,
    );
    return user;
  }
}
