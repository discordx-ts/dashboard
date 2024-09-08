"use client";

import {
  APIGuild,
  APIGuildChannel,
  GuildChannelType,
} from "discord-api-types/v10";
import * as React from "react";

import { useGuild } from "./guild";
import { useGuildChannels } from "./guild-channels";

interface Context {
  guild: APIGuild;
  channels: APIGuildChannel<GuildChannelType>[];
}

interface ProviderProps {
  children: React.ReactNode;
}

const ServerContext = React.createContext<Context | undefined>(undefined);

function ServerProvider({ children }: ProviderProps) {
  const { guild } = useGuild();
  const { channels } = useGuildChannels();

  return (
    <ServerContext.Provider value={{ guild, channels }}>
      {children}
    </ServerContext.Provider>
  );
}

const useServer = (): Context => {
  const context = React.useContext(ServerContext);

  if (!context) {
    throw Error("useServer must be used within an ServerContext");
  }

  return context;
};

export { ServerProvider, useServer };
