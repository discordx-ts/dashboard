import { Welcome as IWelcome } from "@workspace/database";
import { container, singleton } from "tsyringe";

import { PrismaService } from "../services/index.js";
import { Welcome } from "../structures/welcome.js";

@singleton()
export class WelcomeManager {
  constructor(private prisma: PrismaService) {}

  /**
   * Get by id
   */
  async get(id: string): Promise<Welcome | null> {
    try {
      const result = await this.prisma.welcome.findUniqueOrThrow({
        where: { id },
      });

      return new Welcome(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }
  }

  /**
   * Get by discord id
   */
  async getByGuildId(guildId: string): Promise<Welcome | null> {
    try {
      const result = await this.prisma.welcome.findUniqueOrThrow({
        where: { guildId },
      });

      return new Welcome(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null;
    }
  }

  /***
   * Create
   */
  async create(data: Omit<IWelcome, "id" | "createdAt">): Promise<Welcome> {
    const result = await this.prisma.welcome.create({ data });
    return new Welcome(result);
  }

  /**
   * Update
   */
  async update(
    id: string,
    data: Partial<Omit<IWelcome, "id" | "guildId" | "createdAt">>,
  ): Promise<void> {
    await this.prisma.welcome.update({
      data,
      where: { id },
    });
  }
}

export const welcomes = container.resolve(WelcomeManager);
