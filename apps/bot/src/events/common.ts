import type { ArgsOf } from "discordx";
import { Discord, On } from "discordx";

import prisma from "../utils/prisma.js";

@Discord()
export class Example {
  @On()
  async guildMemberAdd([member]: ArgsOf<"guildMemberAdd">) {
    const { systemChannel } = member.guild;
    const data = await prisma.moduleMessage.findFirst({
      where: { guildId: member.guild.id },
    });

    if (!data || !systemChannel) {
      return;
    }

    if (data.isWelcomeEnabled) {
      await systemChannel.send(
        data.welcomeMessage
          .replaceAll("{user}", member.toString())
          .replaceAll("{server}", member.guild.toString()),
      );
    }
  }

  @On()
  async guildMemberRemove([member]: ArgsOf<"guildMemberRemove">) {
    const { systemChannel } = member.guild;
    const data = await prisma.moduleMessage.findFirst({
      where: { guildId: member.guild.id },
    });

    if (!data || !systemChannel) {
      return;
    }

    if (data.isGoodbyeEnabled) {
      await systemChannel.send(
        data.goodbyeMessage
          .replaceAll("{user}", member.toString())
          .replaceAll("{server}", member.guild.toString()),
      );
    }
  }
}
