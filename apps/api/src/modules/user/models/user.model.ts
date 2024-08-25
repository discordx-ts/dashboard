import { UserService } from "../services/user.service";
import { REST } from "@discordjs/rest";
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { User } from "@workspace/database";
import { Exclude, Expose, instanceToPlain } from "class-transformer";
import { APIGuild, Routes } from "discord-api-types/v10";

@Exclude()
export class UserModel {
  @Expose()
  id: number;

  @Expose()
  discordId: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  rest: REST;

  constructor(
    private userService: UserService,
    private user: User,
  ) {
    Object.assign(this, user);
    this.rest = new REST({ version: "10", authPrefix: "Bearer" }).setToken(
      user.accessToken,
    );
  }

  async getGuild(id: string) {
    try {
      const guilds = (await this.rest.get(Routes.userGuilds())) as APIGuild[];
      const guild = guilds.find((guild) => guild.id === id && guild.owner);
      if (!guild) {
        throw Error();
      }

      return guild;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(`Guild ${id} not found`);
    }
  }

  /**
   * To JSON
   */
  toJSON() {
    return instanceToPlain(this, { excludePrefixes: ["_"] });
  }

  /**
   * Update user
   */
  async update(data: Partial<Omit<User, "id" | "discordId" | "createdAt">>) {
    Object.assign(this, data);
    await this.userService.update(this.id, data);
  }
}

@Injectable()
export class UserModelProvider {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  fromPrisma(user: User): UserModel {
    return new UserModel(this.userService, user);
  }
}
