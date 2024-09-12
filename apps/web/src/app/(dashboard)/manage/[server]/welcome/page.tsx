"use client";

import { AxiosError } from "axios";
import React from "react";
import useSWR from "swr";

import { useServer } from "@/components/contexts/server";
import Error from "@/components/molecules/error";
import Loader from "@/components/molecules/loader";
import Variables from "@/components/molecules/variables";
import { api } from "@/lib/api";

import WelcomeForm from "./form";

interface WelcomeGoodbyResponse {
  channelId: string;
  welcomeMessage: string;
  goodbyeMessage: string;
  isWelcomeEnabled: boolean;
  isGoodbyeEnabled: boolean;
}

interface Var {
  code: string;
  description: string;
}

const variables: Var[] = [
  {
    code: "{user}",
    description: "The mention of the user calling the command.",
  },
  { code: "{avatar}", description: "The avatar of the user." },
  { code: "{username}", description: "The username of the user." },
  { code: "{server}", description: "The server name." },
  { code: "{channel}", description: "The channel name." },
  {
    code: "{&role}",
    description: "Mention a role by name, replace role with the role name.",
  },
  {
    code: "{#channel}",
    description:
      "A channel link, replace channel with the name of the channel.",
  },
  { code: "{everyone}", description: "@everyone" },
  { code: "{here}", description: "@here" },
];

export default function Page() {
  const { guild } = useServer();

  const { data, error } = useSWR<
    WelcomeGoodbyResponse,
    AxiosError<{ message?: string }>,
    string
  >(`/welcome/${guild.id}`, (url) => api.get(url).then((res) => res.data));

  if (error) {
    return (
      <Error message={error.response?.data.message ?? "Failed to load data"} />
    );
  }

  if (!data) return <Loader />;

  return (
    <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      <WelcomeForm {...data} />
      <Variables data={variables} />
    </div>
  );
}
