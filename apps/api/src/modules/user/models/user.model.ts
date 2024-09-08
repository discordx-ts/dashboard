import { REST } from "@discordjs/rest";
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { User } from "@workspace/database";
import { Exclude, Expose, instanceToPlain } from "class-transformer";
import { APIGuild, APIUser, Routes } from "discord-api-types/v10";

import { UserService } from "../services/user.service";

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
  private rest: REST;

  constructor(
    private userService: UserService,
    private user: User,
  ) {
    Object.assign(this, user);
    this.rest = new REST({ version: "10", authPrefix: "Bearer" }).setToken(
      this.user.accessToken,
    );
  }

  async getMe() {
    return this.rest.get(Routes.user()) as Promise<APIUser>;
  }

  async getGuilds() {
    const guilds = (await this.rest.get(Routes.userGuilds())) as APIGuild[];
    return guilds.filter((guild) => guild.owner);
  }

  async getGuild(id: string) {
    try {
      const restGuilds = await this.rest.get(Routes.userGuilds());
      const guilds = restGuilds as APIGuild[];

      const guild = guilds.find((guild) => guild.id === id);
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
