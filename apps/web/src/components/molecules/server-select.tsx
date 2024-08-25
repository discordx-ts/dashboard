import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { getInitials } from "@/lib/utils";
import { APIGuild } from "discord-api-types/v10";
import { useRouter } from "next/navigation";
import useSWR from "swr";

interface Props {
  selected: string;
}

export default function ServerSelect({ selected }: Props) {
  const router = useRouter();
  const { data } = useSWR("/discord/guilds", (url) =>
    api.get<APIGuild[]>(url).then((res) => res.data),
  );

  const servers = data ?? [];

  const onValueChange = (value: string) => {
    router.push(`/manage/${value}`);
  };

  return (
    <>
      <Select value={selected} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select server" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Servers</SelectLabel>
            {servers.map(({ id, name, icon }) => (
              <SelectItem key={`server-${id}`} value={`${id}`}>
                <div className="flex items-center gap-2">
                  <Avatar className="size-5 text-xs">
                    {icon && (
                      <AvatarImage
                        src={`https://cdn.discordapp.com/icons/${id}/${icon}.jpg`}
                      />
                    )}
                    <AvatarFallback>{getInitials(name)}</AvatarFallback>
                  </Avatar>
                  <span>{name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
