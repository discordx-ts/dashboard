import {
  LayoutDashboard,
  LucideProps,
  PartyPopper,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useGuild } from "../contexts/guild";

interface Item {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  href: string;
}

interface Props {
  onClick?: () => void;
}

export default function Sidebar({ onClick }: Props) {
  const { guild } = useGuild();

  const pathname = usePathname();

  const items: (Item | string)[] = [
    {
      title: "Dashboard",
      Icon: LayoutDashboard,
      href: `/manage/${guild.id}`,
    },
    "Essentials",
    {
      title: "Welcome & Goodbye",
      Icon: PartyPopper,
      href: `/manage/${guild.id}/welcome`,
    },
    "Server Management",
    {
      title: "Moderation",
      Icon: SettingsIcon,
      href: `/manage/${guild.id}/moderation`,
    },
  ];

  return (
    <nav className="flex flex-col gap-4 px-2 sm:py-4">
      {items.map((item, index) =>
        typeof item === "string" ? (
          <h1
            key={`header-item-${index.toString()}`}
            className="text-xs font-medium"
          >
            {item}
          </h1>
        ) : (
          <Link
            key={`header-item-${index.toString()}`}
            href={item.href}
            onClick={onClick}
          >
            <Button
              variant="ghost"
              className={cn("text-muted-foreground w-full justify-start", {
                "bg-accent text-foreground": pathname === item.href,
              })}
            >
              <item.Icon className="mr-2 size-4" />
              <span>{item.title}</span>
            </Button>
          </Link>
        ),
      )}
    </nav>
  );
}
