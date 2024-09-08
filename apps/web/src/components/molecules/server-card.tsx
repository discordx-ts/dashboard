import { APIGuild } from "discord-api-types/v10";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";

export default function ServerCard({ name, id, icon }: APIGuild) {
  const avatar = icon
    ? `https://cdn.discordapp.com/icons/${id}/${icon}.jpg`
    : null;

  return (
    <div className="bg-muted space-y-4 overflow-hidden rounded-md">
      <div className="relative flex h-40 items-center justify-center overflow-hidden border-b">
        {avatar ? (
          <Image
            alt="background"
            src={avatar}
            fill
            className="absolute blur-xl"
          />
        ) : (
          <div className="absolute h-full w-full" />
        )}
        <Avatar className="size-20 border">
          {avatar && <AvatarImage src={avatar} />}
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-4 p-4">
        <h1 className="line-clamp-2 h-12 text-sm">{name}</h1>
        <Link href={`/manage/${id}`}>
          <Button>Manage</Button>
        </Link>
      </div>
    </div>
  );
}
