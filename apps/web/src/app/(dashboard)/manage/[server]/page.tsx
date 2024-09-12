"use client";

import { ChannelType } from "discord-api-types/v10";
import React from "react";

import { useServer } from "@/components/contexts/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const { guild, channels } = useServer();

  const categories = channels.filter(
    ({ type }) => type === ChannelType.GuildCategory,
  ).length;

  const textChannels = channels.filter(
    ({ type }) => type === ChannelType.GuildText,
  ).length;

  const voiceChannels = channels.filter(
    ({ type }) => type === ChannelType.GuildVoice,
  ).length;

  return (
    <div>
      <Card className="max-w-screen-md">
        <CardHeader>
          <CardTitle className="uppercase">Server Info</CardTitle>
          <CardDescription>{guild.name}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-2">
          <div>
            <span className="text-muted-foreground">Id:</span> {guild.id}
          </div>
          <div>
            <span className="text-muted-foreground">Members:</span>{" "}
            {guild.approximate_member_count}
          </div>
          <div>
            <span className="text-muted-foreground">Categories:</span>{" "}
            {categories}
          </div>
          <div>
            <span className="text-muted-foreground">Text Channels:</span>{" "}
            {textChannels}
          </div>
          <div>
            <span className="text-muted-foreground">Voice Channels:</span>{" "}
            {voiceChannels}
          </div>
          <div>
            <span className="text-muted-foreground">Roles:</span>{" "}
            {guild.roles.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
