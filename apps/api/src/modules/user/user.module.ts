import { PrismaModule } from "../prisma/prisma.module";
import { UserModelProvider } from "./models/user.model";
import { UserService } from "./services/user.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserModelProvider],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
