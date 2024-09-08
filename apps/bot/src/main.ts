import { dirname, importx } from "@discordx/importer";
import "dotenv/config";

import { bot } from "./bot.js";

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

  // Let's start the bot
  if (!process.env.DISCORD_BOT_TOKEN) {
    throw Error("Could not find DISCORD_BOT_TOKEN in your environment");
  }

  // Log in with your bot token
  await bot.login(process.env.DISCORD_BOT_TOKEN);
}

void run();
