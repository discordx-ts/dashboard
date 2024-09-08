import { PanelLeft } from "lucide-react";
import React from "react";

import { useGuild } from "@/components/contexts/guild";
import { HeaderUser } from "@/components/molecules/header";
import Sidebar from "@/components/molecules/sidebar";
import { ThemeModeToggle } from "@/components/molecules/theme-mode";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ManageHeader() {
  const { guild } = useGuild();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <SheetClose />
          <Sidebar onClick={handleClick} />
        </SheetContent>
      </Sheet>
      <h1>{guild.name}</h1>
      <span className="flex-1" />
      <HeaderUser />
      <ThemeModeToggle />
    </header>
  );
}
