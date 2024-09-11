import { User as IUser } from "@workspace/database";
import { container, singleton } from "tsyringe";

import { PrismaService } from "../services/index.js";
import { User } from "../structures/index.js";

@singleton()
export class UserManager {
  constructor(private prisma: PrismaService) {}

  /**
   * Get by id
   */
  async get(id: string): Promise<User | null> {
    try {
      const result = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      return new User(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }
  }

  /**
   * Get by discord id
   */
  async getByDiscordId(discordId: string): Promise<User | null> {
    try {
      const result = await this.prisma.user.findUniqueOrThrow({
        where: { discordId },
      });

      return new User(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }
  }

  /***
   * Create
   */
  async create(user: Omit<IUser, "id" | "createdAt">): Promise<User> {
    const result = await this.prisma.user.create({ data: user });
    return new User(result);
  }

  /**
   * Update
   */
  async update(
    id: string,
    data: Partial<Omit<IUser, "id" | "discordId" | "createdAt">>,
  ): Promise<void> {
    await this.prisma.user.update({
      data,
      where: { id },
    });
  }
}

export const users = container.resolve(UserManager);
