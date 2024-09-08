"use client";

import { APIGuild } from "discord-api-types/v10";
import useSWR from "swr";

import Header from "@/components/molecules/header";
import Loader from "@/components/molecules/loader";
import ServerCard from "@/components/molecules/server-card";
import { api } from "@/lib/api";

function View() {
  const { data } = useSWR("/discord/guilds", (url) =>
    api.get<APIGuild[]>(url).then((res) => res.data),
  );

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((server, index) => (
        <ServerCard key={`server-${index}`} {...server} />
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Header />
      <div className="mx-auto mt-20 max-w-screen-2xl space-y-10 px-4 py-10">
        <div className="space-y-2">
          <h1 className="text-center text-2xl font-medium">
            Manage Your Servers
          </h1>
          <h1 className="text-muted-foreground text-center">
            Choose a server to get started with management
          </h1>
        </div>
        <View />
      </div>
    </>
  );
}
