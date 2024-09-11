"use client";

import { APIGuild } from "discord-api-types/v10";
import * as React from "react";
import useSWR from "swr";

import { api } from "@/lib/api";
import errorToString from "@/lib/error";

import ErrorScreen from "../molecules/error";
import Header from "../molecules/header";
import Loader from "../molecules/loader";

interface Context {
  guild: APIGuild;
}

interface ProviderProps {
  children: React.ReactNode;
  guildId: string;
}

const GuildContext = React.createContext<Context | undefined>(undefined);

function GuildProvider({ children, guildId }: ProviderProps) {
  const { data: guild, error } = useSWR(`/guilds/${guildId}`, (url) =>
    api.get<APIGuild>(url).then((res) => res.data),
  );

  if (error) {
    return (
      <>
        <Header />
        <ErrorScreen message={errorToString(error)} />
      </>
    );
  }

  if (!guild) {
    return <Loader />;
  }

  return (
    <GuildContext.Provider value={{ guild }}>{children}</GuildContext.Provider>
  );
}

const useGuild = (): Context => {
  const context = React.useContext(GuildContext);

  if (!context) {
    throw Error("useGuild must be used within an GuildProvider");
  }

  return context;
};

export { GuildProvider, useGuild };
