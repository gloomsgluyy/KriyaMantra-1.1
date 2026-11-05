import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[52px] w-full rounded-[14px] border border-[#e7e5e4] bg-[#ffffff] px-4 py-3 text-base text-[#292524] shadow-sm transition-all placeholder:text-[#57534e]/60 focus-visible:outline-none focus-visible:border-[#f59e0b] focus-visible:ring-2 focus-visible:ring-[#f59e0b]/30 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[#f59e0b] aria-[invalid=true]:ring-[#f59e0b]/40",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
