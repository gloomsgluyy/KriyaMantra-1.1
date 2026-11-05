"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ArtisanBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: "system" | "user";
  showWave?: boolean;
}

export function ArtisanBubble({
  children,
  role = "system",
  showWave = false,
  className,
  ...props
}: ArtisanBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full my-2",
        isUser ? "justify-end" : "justify-start",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative max-w-[85%] md:max-w-[70%] px-4 py-3 text-sm md:text-base leading-relaxed transition-all shadow-[0_1.5rem_3rem_-1.5rem_rgba(41,37,36,0.12)] flex items-start gap-2.5",
          isUser
            ? "bg-[#f59e0b] text-[#292524] rounded-[20px_20px_5px_20px] font-medium"
            : "bg-[#ffffff] text-[#292524] rounded-[20px_20px_20px_5px] border border-[#e7e5e4]"
        )}
      >
        <div className="flex-1 min-w-0">{children}</div>

        {showWave && (
          <span
            className="wave-bars active shrink-0 mt-1 opacity-75"
            aria-hidden="true"
          >
            <span className={isUser ? "bg-[#292524]" : "bg-[#f59e0b]"}></span>
            <span className={isUser ? "bg-[#292524]" : "bg-[#f59e0b]"}></span>
            <span className={isUser ? "bg-[#292524]" : "bg-[#f59e0b]"}></span>
          </span>
        )}
      </div>
    </div>
  );
}

export { ArtisanBubble as SpeechBubble };
