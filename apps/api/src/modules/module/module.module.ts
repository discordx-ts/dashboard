import { PrismaModule } from "../prisma/prisma.module";
import { WelcomeGoodbyeModuleController } from "./controllers/welcome-goodbye.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [PrismaModule],
  providers: [],
  controllers: [WelcomeGoodbyeModuleController],
  exports: [],
})
export class ModuleModule {}
