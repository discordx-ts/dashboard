import { PrismaModule } from "../prisma/prisma.module";
import { UserEntityProvider } from "./entities/user.entity";
import { UserService } from "./services/user.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserEntityProvider],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
