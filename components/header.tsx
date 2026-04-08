"use client";

import { Bell, Settings, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="header-gradient sticky top-0 z-10 border-b border-slate-200 text-white">
      <div className="container mx-auto px-4 text-white">
        <div className="flex h-auto flex-col items-center justify-between gap-2 py-2 sm:h-16 sm:flex-row sm:gap-0 sm:py-0">
          <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Oga's Office</h1>
              <p className="text-xs text-white">Household Staff Management</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3 sm:flex-nowrap">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback>OA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
