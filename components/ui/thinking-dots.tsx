"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ThinkingDotsProps {
  label?: string;
  className?: string;
}

export function ThinkingDots({
  label = "Asisten Kriya Mantra sedang berpikir...",
  className,
}: ThinkingDotsProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "flex w-fit items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#fffdfa] border border-[#fde68a] text-xs text-[#b45309] shadow-xs",
        className
      )}
    >
      <span aria-hidden="true" className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-bounce"
            style={{ animationDelay: `${i * 180}ms`, animationDuration: "1s" }}
          />
        ))}
      </span>
      <span className="font-medium text-xs tracking-tight">{label}</span>
    </div>
  );
}

