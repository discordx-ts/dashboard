"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelType } from "discord-api-types/v10";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useServer } from "@/components/contexts/server";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

import { WelcomeResponse } from "./types";

const formSchema = z.object({
  channelId: z.string(),
  welcomeMessage: z.string().min(1).max(200),
  goodbyeMessage: z.string().min(1).max(200),
  isWelcomeEnabled: z.boolean(),
  isGoodbyeEnabled: z.boolean(),
});

export default function WelcomeForm(data: WelcomeResponse) {
  const { guild, channels } = useServer();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channelId: data.channelId,
      welcomeMessage: data.welcomeMessage,
      goodbyeMessage: data.goodbyeMessage,
      isWelcomeEnabled: data.isWelcomeEnabled,
      isGoodbyeEnabled: data.isGoodbyeEnabled,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await api.patch(`/welcome/${guild.id}`, values);
    toast.success("Configuration saved");
  };

  return (
    <>
      <div className="bg-background max-w-lg rounded-md p-4 shadow">
        <h1 className="mb-6 text-2xl font-bold">Welcome & Goodbye</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="channelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Channels</SelectLabel>
                          {channels
                            .filter(
                              ({ type }) => type === ChannelType.GuildText,
                            )
                            .map((channel) => (
                              <SelectItem key={channel.id} value={channel.id}>
                                {channel.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Where welcome message would be send
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="welcomeMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Welcome Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    This message will be triggered when a new member joins the
                    server.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goodbyeMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goodbye Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    This message will be triggered when a member leaves the
                    server.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isWelcomeEnabled"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Send welcome message
                  </label>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="isGoodbyeEnabled"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Send goodbye message
                  </label>
                </div>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
