import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User, users } from "@workspace/repo";
import { Profile } from "passport-discord";

import { ConfigKeys, ConfigService } from "../../config/config.service.js";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateDiscordUser(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<User> {
    let user = await users.getByDiscordId(profile.id);

    if (!user) {
      user = await users.create({
        discordId: profile.id,
        accessToken,
        refreshToken,
      });
    } else {
      await user.update({ accessToken, refreshToken });
    }

    return user;
  }

  login(user: User) {
    const payload = { sub: user.id, discordId: user.discordId };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get(ConfigKeys.JWT_SECRET),
      }),
    };
  }
}
