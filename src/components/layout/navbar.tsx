"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-media-query";
import { MobileSidebar } from "./sidebar";

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const isMobile = useIsMobile();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
      {isMobile && <MobileSidebar />}

      <div className="flex-1" />

      {/* Search */}
      <div className="relative hidden md:block">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search trips, clients, vehicles..."
          className="h-9 w-64 rounded-lg bg-muted/50 pl-8 text-sm"
        />
      </div>

      {/* Theme toggle */}
      <Button variant="ghost" size="icon" className="rounded-lg" onClick={toggleTheme}>
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-lg">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
              3
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.map((notif, i) => (
            <DropdownMenuItem key={i} className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${notif.color}`} />
                <span className="text-sm font-medium">{notif.title}</span>
              </div>
              <span className="text-xs text-muted-foreground">{notif.message}</span>
              <span className="text-[10px] text-muted-foreground/60">{notif.time}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

const notifications = [
  {
    title: "Panic Alert",
    message: "Vehicle CBZ-012 panic button activated at Borrowdale branch",
    time: "2 min ago",
    color: "bg-destructive",
  },
  {
    title: "Trip Delayed",
    message: "Trip #CIT-2024-089 delayed by 15 min due to traffic",
    time: "15 min ago",
    color: "bg-warning",
  },
  {
    title: "Collection Complete",
    message: "Sam Levy branch collection completed successfully",
    time: "1 hour ago",
    color: "bg-success",
  },
];
