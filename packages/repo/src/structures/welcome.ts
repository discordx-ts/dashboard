import { Welcome as IWelcome } from "@workspace/database";
import { injectable } from "tsyringe";

@injectable()
export class Welcome implements IWelcome {
  id!: string;
  guildId!: string;
  channelId!: string;
  welcomeMessage!: string;
  goodbyeMessage!: string;
  isWelcomeEnabled!: boolean;
  isGoodbyeEnabled!: boolean;

  constructor(private data: IWelcome) {
    Object.assign(this, data);
  }

  toJSON() {
    return this.data;
  }
}
