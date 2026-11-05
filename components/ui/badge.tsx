import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#292524] text-[#ffffff] border-transparent",
        amber:
          "bg-[#fde68a] text-[#292524] border border-[#f59e0b]/30",
        cream:
          "bg-[#fffbeb] text-[#292524] border border-[#e7e5e4]",
        success:
          "bg-emerald-50 text-emerald-800 border border-emerald-200",
        warning:
          "bg-amber-50 text-amber-800 border border-amber-200",
        danger:
          "bg-red-50 text-red-800 border border-red-200",
        outline:
          "text-[#57534e] border border-[#e7e5e4] bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
