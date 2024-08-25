"use client";

import Error from "@/components/molecules/error";
import Loader from "@/components/molecules/loader";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";

const formSchema = z.object({
  welcomeMessage: z.string().min(1).max(200),
  goodbyeMessage: z.string().min(1).max(200),
  isWelcomeEnabled: z.boolean(),
  isGoodbyeEnabled: z.boolean(),
});

export default function Page() {
  const { server } = useParams();
  const { data, error, mutate } = useSWR(
    `/module/${server}/welcome-goodbye`,
    (url) =>
      api
        .get<{
          welcomeMessage: string;
          goodbyeMessage: string;
          isWelcomeEnabled: boolean;
          isGoodbyeEnabled: boolean;
        }>(url)
        .then((res) => res.data),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      welcomeMessage: data?.welcomeMessage || "",
      goodbyeMessage: data?.goodbyeMessage || "",
      isWelcomeEnabled: data?.isWelcomeEnabled ?? true,
      isGoodbyeEnabled: data?.isGoodbyeEnabled ?? true,
    },
  });

  React.useEffect(() => {
    if (data) {
      form.setValue("welcomeMessage", data.welcomeMessage);
      form.setValue("goodbyeMessage", data.goodbyeMessage);
      form.setValue("isWelcomeEnabled", data.isWelcomeEnabled);
      form.setValue("isGoodbyeEnabled", data.isGoodbyeEnabled);
    }
  }, [data]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await api.patch(`/module/${server}/welcome-goodbye`, values);
    await mutate();
    toast.success("Configuration saved");
  };

  if (error)
    return (
      <Error
        message={
          (error as AxiosError<{ message?: string }>).response?.data.message ??
          "Failed to load data"
        }
      />
    );
  if (!data) return <Loader />;

  return (
    <>
      <div className="bg-background max-w-lg rounded-md p-4 shadow">
        <h1 className="mb-6 text-2xl font-bold">Welcome & Goodbye</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
