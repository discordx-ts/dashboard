import { welcomes } from "@workspace/repo";
import type { ArgsOf } from "discordx";
import { Discord, On } from "discordx";

@Discord()
export class Example {
  @On()
  async guildMemberAdd([member]: ArgsOf<"guildMemberAdd">) {
    /**
     * Get guild welcome data
     */
    const data = await welcomes.getByGuildId(member.guild.id);

    if (!data) {
      return;
    }

    /**
     * Get welcome channel
     */

    const channel = member.guild.channels.cache.get(data.channelId);
    if (!channel?.isTextBased()) {
      return;
    }

    /**
     * Send welcome message if enabled
     */
    if (data.isWelcomeEnabled) {
      await channel.send(
        data.welcomeMessage
          .replaceAll("{user}", member.toString())
          .replaceAll("{server}", member.guild.toString()),
      );
    }
  }

  @On()
  async guildMemberRemove([member]: ArgsOf<"guildMemberRemove">) {
    /**
     * Get guild welcome data
     */
    const data = await welcomes.getByGuildId(member.guild.id);

    if (!data) {
      return;
    }

    /**
     * Get welcome channel
     */

    const channel = member.guild.channels.cache.get(data.channelId);
    if (!channel?.isTextBased()) {
      return;
    }

    /**
     * Send goodbye message if enabled
     */
    if (data.isGoodbyeEnabled) {
      await channel.send(
        data.goodbyeMessage
          .replaceAll("{user}", member.toString())
          .replaceAll("{server}", member.guild.toString()),
      );
    }
  }
}
