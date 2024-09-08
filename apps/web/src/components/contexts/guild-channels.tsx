"use client";

import { APIGuildChannel, GuildChannelType } from "discord-api-types/v10";
import * as React from "react";
import useSWR from "swr";

import { api } from "@/lib/api";
import errorToString from "@/lib/error";

import ErrorScreen from "../molecules/error";
import Loader from "../molecules/loader";
import { useGuild } from "./guild";

interface Context {
  channels: APIGuildChannel<GuildChannelType>[];
}

interface ProviderProps {
  children: React.ReactNode;
}

const GuildChannelContext = React.createContext<Context | undefined>(undefined);

function GuildChannelProvider({ children }: ProviderProps) {
  const { guild } = useGuild();

  const { data: channels, error } = useSWR(
    `/guilds/${guild.id}/channels`,
    async (url) => {
      return api
        .get<APIGuildChannel<GuildChannelType>[]>(url)
        .then((res) => res.data);
    },
  );

  if (error) {
    return <ErrorScreen message={errorToString(error)} />;
  }

  if (!channels) {
    return <Loader />;
  }

  return (
    <GuildChannelContext.Provider value={{ channels }}>
      {children}
    </GuildChannelContext.Provider>
  );
}

const useGuildChannels = (): Context => {
  const context = React.useContext(GuildChannelContext);

  if (!context) {
    throw Error("useGuild must be used within an GuildProvider");
  }

  return context;
};

export { GuildChannelProvider, useGuildChannels };
