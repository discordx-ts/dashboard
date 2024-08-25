import { PrismaService } from "../../prisma/services/prisma.service";
import { UserEntity, UserEntityProvider } from "../entities/user.entity";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { User } from "@workspace/database";

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => UserEntityProvider))
    private userEntityProvider: UserEntityProvider,
    private prisma: PrismaService,
  ) {}

  /**
   * Get user by id
   */
  async get(id: number): Promise<UserEntity | null> {
    try {
      const result = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      return this.userEntityProvider.fromPrisma(result);
    } catch (err) {
      return null;
    }
  }

  /**
   * Get user by discord id
   */
  async getByDiscordId(id: string): Promise<UserEntity | null> {
    try {
      const result = await this.prisma.user.findUniqueOrThrow({
        where: { discordId: id },
      });

      return this.userEntityProvider.fromPrisma(result);
    } catch (err) {
      return null;
    }
  }

  /***
   * Create user
   */
  async create(user: Omit<User, "id" | "createdAt">): Promise<UserEntity> {
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