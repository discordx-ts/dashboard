"use client";

import { APIGuild } from "discord-api-types/v10";
import Link from "next/link";
import * as React from "react";
import useSWR from "swr";

import { api } from "@/lib/api";
import errorToString from "@/lib/error";

import Header from "../molecules/header";
import Loader from "../molecules/loader";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
        <div className="flex h-screen w-full items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Something went wrong!</CardTitle>
              <CardDescription>{errorToString(error)}</CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex gap-2">
                <Button variant="outline">Add to Discord</Button>
                <Link href="/manage">
                  <Button variant="outline">My Servers</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
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
