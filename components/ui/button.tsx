import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#292524] text-[#ffffff] hover:bg-[#3f3b39] active:scale-[0.98] rounded-full",
        amber:
          "bg-[#f59e0b] text-[#292524] font-semibold hover:bg-[#d97706] shadow-[0_0.75rem_1.75rem_-0.75rem_rgba(245,158,11,0.7)] active:scale-[0.98] rounded-full transition-transform",
        dark:
          "bg-[#292524] text-[#ffffff] font-semibold hover:bg-[#1c1917] active:scale-[0.98] rounded-full transition-transform",
        outline:
          "border border-[#e7e5e4] bg-white text-[#292524] hover:bg-[#fffbeb] active:scale-[0.98] rounded-full",
        secondary:
          "bg-[#fffbeb] text-[#292524] hover:bg-[#fef3c7] rounded-full",
        ghost:
          "hover:bg-[#fffbeb] hover:text-[#292524] rounded-full",
        destructive:
          "bg-red-50 text-red-600 hover:bg-red-100 rounded-full",
        link: "text-[#f59e0b] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 text-sm gap-2",
        sm: "h-9 px-3.5 text-xs gap-1.5",
        lg: "h-[52px] px-7 text-base font-semibold gap-2.5",
        compact: "h-10 px-4 text-xs font-semibold gap-1.5",
        icon: "size-10 rounded-full",
        "icon-sm": "size-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "amber",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "amber",
  size = "default",
  asChild = false,
  showWave,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    showWave?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}

export type ButtonProps = React.ComponentProps<typeof Button>;
export { Button, buttonVariants };
