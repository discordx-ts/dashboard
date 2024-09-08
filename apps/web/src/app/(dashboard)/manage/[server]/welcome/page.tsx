"use client";

import { AxiosError } from "axios";
import React from "react";
import useSWR from "swr";

import { useServer } from "@/components/contexts/server";
import Error from "@/components/molecules/error";
import Loader from "@/components/molecules/loader";
import { api } from "@/lib/api";

import WelcomeForm from "./form";

interface WelcomeGoodbyResponse {
  channelId: string;
  welcomeMessage: string;
  goodbyeMessage: string;
  isWelcomeEnabled: boolean;
  isGoodbyeEnabled: boolean;
}

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
    <>
      <WelcomeForm {...data} />
    </>
  );
}
