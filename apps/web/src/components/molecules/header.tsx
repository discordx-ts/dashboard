"use client";

import { useAuth } from "../contexts/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeModeToggle } from "./theme-mode";
import { BASE_API_ENDPOINT } from "@/lib/api";
import { getInitials } from "@/lib/utils";
import { CaretDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function HeaderUser() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <Link href={`${BASE_API_ENDPOINT}/auth/discord`}>
        <Button>Login with Discord</Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1">
          <Avatar className="size-8">
            {user.avatar && (
              <AvatarImage
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=512`}
              />
            )}
            <AvatarFallback>
              {getInitials(user.global_name ?? "Unknown")}
            </AvatarFallback>
          </Avatar>
          <Button variant="link">{user.global_name}</Button>
          <CaretDownIcon className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/manage">
            <DropdownMenuItem>My servers</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="https://github.com/discordx-ts/dashboard" target="_blank">
          <DropdownMenuItem>GitHub</DropdownMenuItem>
        </Link>
        <Link href="https://discordx.js.org/discord" target="_blank">
          <DropdownMenuItem>Support</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  return (
    <div className="bg-background fixed top-0 z-10 w-full border-b">
      <div className="flex h-full items-center gap-2 px-4 py-4 sm:px-6">
        <Link href="/">
          <Button variant="link">Discordx</Button>
        </Link>
        <Link href="/">
          <Button variant="link">Add to Discord</Button>
        </Link>
        <span className="flex-1" />
        <HeaderUser />
        <ThemeModeToggle />
      </div>
    </div>
  );
}
