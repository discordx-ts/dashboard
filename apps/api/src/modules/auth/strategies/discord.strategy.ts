import { ConfigKeys, ConfigService } from "../../config/config.service";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-discord";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, "discord") {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
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
  ): Promise<any> {
    const user = await this.authService.validateDiscordUser(
      accessToken,
      refreshToken,
      profile,
    );
    return user;
  }
}
