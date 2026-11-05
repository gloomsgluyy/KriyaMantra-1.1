"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SuggestionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Suggestions({ className, children, ...props }: SuggestionsProps) {
  return (
    <div
      className={cn(
        "flex w-full overflow-x-auto no-scrollbar py-1.5 items-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SuggestionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  suggestion: string;
  onClick?: (suggestion: string) => void;
  icon?: React.ReactNode;
}

export function Suggestion({
  suggestion,
  onClick,
  icon,
  className,
  children,
  ...props
}: SuggestionProps) {
  const handleClick = React.useCallback(() => {
    onClick?.(suggestion);
  }, [onClick, suggestion]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#fde68a] bg-[#fffdfa] px-3.5 py-1.5 text-xs md:text-sm font-medium text-[#292524] shadow-sm transition-all hover:bg-[#fef3c7] hover:border-[#f59e0b] focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/40 cursor-pointer active:scale-95 shrink-0",
        className
      )}
      {...props}
    >
      {icon && <span className="text-[#f59e0b] shrink-0">{icon}</span>}
      <span>{children || suggestion}</span>
    </button>
  );
}

