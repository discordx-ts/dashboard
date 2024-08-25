import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { APIGuild } from "discord-api-types/v10";
import Image from "next/image";
import Link from "next/link";

export default function ServerCard({ name, id, icon }: APIGuild) {
  const avatar = `https://cdn.discordapp.com/icons/${id}/${icon}.jpg`;

  return (
    <div className="bg-muted space-y-4 overflow-hidden rounded-md">
      <div className="relative flex h-40 items-center justify-center overflow-hidden">
        <Image
          alt="background"
          src={avatar}
          fill
          className="absolute blur-xl"
        />
        <Avatar className="size-20 border">
          <AvatarImage src={avatar} />
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
