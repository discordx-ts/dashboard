import { PanelLeft } from "lucide-react";
import React from "react";

import { useServer } from "@/components/contexts/server";
import { HeaderUser } from "@/components/molecules/header";
import ServerSelect from "@/components/molecules/server-select";
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
  const { guild } = useServer();

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
          <div className="px-2 pb-4">
            <ServerSelect selected={guild.id} />
          </div>
          <Sidebar onClick={handleClick} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block">
        <ServerSelect selected={guild.id} />
      </div>
      <span className="flex-1" />
      <HeaderUser />
      <ThemeModeToggle />
    </header>
  );
}
