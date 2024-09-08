"use client";

import React from "react";

import { GuildProvider } from "@/components/contexts/guild";
import { GuildChannelProvider } from "@/components/contexts/guild-channels";
import { ServerProvider } from "@/components/contexts/server";
import Sidebar from "@/components/molecules/sidebar";

import ManageHeader from "./header";

interface Props {
  children: React.ReactNode;
  params: {
    server: string;
  };
}

export default function Layout({ children, params: { server } }: Props) {
  return (
    <GuildProvider guildId={server}>
      <GuildChannelProvider>
        <ServerProvider>
          <div className="bg-muted/40 flex min-h-screen w-full flex-col">
            <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-56 flex-col border-r sm:flex">
              <Sidebar />
            </aside>
            <div className="flex flex-col gap-4 sm:py-4 sm:pl-56">
              <ManageHeader />
              <main className="px-4 sm:px-6">{children}</main>
            </div>
          </div>
        </ServerProvider>
      </GuildChannelProvider>
    </GuildProvider>
  );
}
