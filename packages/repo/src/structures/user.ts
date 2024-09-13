import { REST } from "@discordjs/rest";
import { User as IUser } from "@workspace/database";
import { APIGuild, APIUser, Routes } from "discord-api-types/v10";
import { injectable } from "tsyringe";

import { users } from "../managers/user.js";

@injectable()
export class User implements IUser {
  id!: string;
  discordId!: string;
  accessToken!: string;
  refreshToken!: string;
  createdAt!: Date;

  private rest: REST;

  constructor(private data: IUser) {
    Object.assign(this, data);
    this.rest = new REST({ version: "10", authPrefix: "Bearer" }).setToken(
      this.accessToken,
    );
  }

  toJSON() {
    return this.data;
  }

  async getMe() {
    return this.rest.get(Routes.user()) as Promise<APIUser>;
  }

  async getGuilds() {
    const guilds = (await this.rest.get(Routes.userGuilds())) as APIGuild[];
    return guilds.filter((guild) => guild.owner);
  }

  async getGuild(id: string) {
    const guilds = (await this.rest.get(Routes.userGuilds())) as APIGuild[];
    const guild = guilds.find((guild) => guild.id === id);
    return guild ?? null;
  }

  /**
   * Update user
   */
  async update(data: Partial<Omit<IUser, "id" | "discordId" | "createdAt">>) {
    Object.assign(this, data);
    await users.update(this.id, data);
  }
}
