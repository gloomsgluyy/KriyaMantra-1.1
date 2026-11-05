import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[100px] w-full rounded-[14px] border border-[#e7e5e4] bg-[#ffffff] p-4 text-base text-[#292524] shadow-sm transition-all placeholder:text-[#57534e]/60 focus-visible:outline-none focus-visible:border-[#f59e0b] focus-visible:ring-2 focus-visible:ring-[#f59e0b]/30 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
