import { ConfigService, ConfigKeys } from "../../config/config.service";
import { UserEntity } from "../../user/entities/user.entity";
import { UserService } from "../../user/services/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

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

  async validate(payload: any): Promise<UserEntity> {
    const { sub } = payload;
    const user = await this.userService.get(sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
