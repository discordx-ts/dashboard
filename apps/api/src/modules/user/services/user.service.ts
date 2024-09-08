import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { User } from "@workspace/database";

import { PrismaService } from "../../prisma/services/prisma.service";
import { UserModel, UserModelProvider } from "../models/user.model";

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => UserModelProvider))
    private userEntityProvider: UserModelProvider,
    private prisma: PrismaService,
  ) {}

  /**
   * Get user by id
   */
  async get(id: number): Promise<UserModel | null> {
    try {
      const result = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      return this.userEntityProvider.fromPrisma(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }
  }

  /**
   * Get user by discord id
   */
  async getByDiscordId(id: string): Promise<UserModel | null> {
    try {
      const result = await this.prisma.user.findUniqueOrThrow({
        where: { discordId: id },
      });

      return this.userEntityProvider.fromPrisma(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }
  }

  /***
   * Create user
   */
  async create(user: Omit<User, "id" | "createdAt">): Promise<UserModel> {
    const result = await this.prisma.user.create({ data: user });
    return this.userEntityProvider.fromPrisma(result);
  }

  /**
   * Update user
   */
  async update(
    id: number,
    data: Partial<Omit<User, "id" | "discordId" | "createdAt">>,
  ): Promise<void> {
    await this.prisma.user.update({
      data,
      where: { id },
    });
  }
}
