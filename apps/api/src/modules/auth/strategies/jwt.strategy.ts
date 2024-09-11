import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User, users } from "@workspace/repo";
import { ExtractJwt, Strategy } from "passport-jwt";

import { ConfigKeys, ConfigService } from "../../config/config.service.js";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(ConfigKeys.JWT_SECRET),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: any): Promise<User> {
    const { sub } = payload;

    const user = await users.get(sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
