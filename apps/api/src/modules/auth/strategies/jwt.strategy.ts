import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { ConfigKeys, ConfigService } from "../../config/config.service";
import { UserModel } from "../../user/models/user.model";
import { UserService } from "../../user/services/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(ConfigKeys.JWT_SECRET),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: any): Promise<UserModel> {
    const { sub } = payload;
    const user = await this.userService.get(sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
