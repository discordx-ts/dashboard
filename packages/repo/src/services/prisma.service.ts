import { PrismaClient } from "@workspace/database";
import { singleton } from "tsyringe";

@singleton()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
    void this.$connect();
  }
}
