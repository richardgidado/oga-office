"use client";

import * as React from "react";
import { MoreVertical, PauseCircle, PlayCircle, UserX } from "lucide-react";

interface DropdownMenuOption {
  label: string;
  onClick: () => void;
  icon: "suspend" | "unsuspend" | "fire";
  className?: string;
}

interface DropdownMenuProps {
  options: DropdownMenuOption[];
}

const getIcon = (iconType: string, className?: string) => {
  switch (iconType) {
    case "suspend":
      return <PauseCircle className={`mr-2 h-4 w-4 ${className || ""}`} />;
    case "unsuspend":
      return <PlayCircle className={`mr-2 h-4 w-4 ${className || ""}`} />;
    case "fire":
      return <UserX className={`mr-2 h-4 w-4 ${className || ""}`} />;
    default:
      return null;
  }
};

export function DropdownMenu({ options }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100"
      >
        <MoreVertical className="h-4 w-4 text-black" />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 min-w-[140px] overflow-hidden rounded-md border border-slate-200 bg-white shadow-md">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              className={`flex w-full items-center px-3 py-2 text-sm hover:bg-slate-100 ${option.className || "text-black"}`}
            >
              {getIcon(option.icon, option.className)}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
