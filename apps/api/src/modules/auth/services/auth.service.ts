import { ConfigKeys, ConfigService } from "../../config/config.service";
import { UserModel } from "../../user/models/user.model";
import { UserService } from "../../user/services/user.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Profile } from "passport-discord";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateDiscordUser(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<UserModel> {
    let user = await this.userService.getByDiscordId(profile.id);

    if (!user) {
      user = await this.userService.create({
        discordId: profile.id,
        accessToken,
        refreshToken,
      });
    } else {
      await user.update({ accessToken, refreshToken });
    }

    return user;
  }

  async login(user: UserModel) {
    const payload = { sub: user.id, discordId: user.discordId };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get(ConfigKeys.JWT_SECRET),
      }),
    };
  }
}
