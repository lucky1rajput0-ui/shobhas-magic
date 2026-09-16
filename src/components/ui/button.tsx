import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,border-color,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-ivory hover:bg-forest-deep",
        ink: "bg-ink text-ivory hover:bg-ink-soft",
        saffron: "bg-saffron text-ivory hover:bg-terracotta",
        outline:
          "border border-line-strong bg-transparent text-ink hover:bg-cream",
        ghost: "text-ink hover:bg-cream",
        inverse: "bg-ivory text-ink hover:bg-cream",
        whatsapp: "bg-[#1f6b46] text-ivory hover:bg-[#185538]",
      },
      size: {
        sm: "h-9 px-3 text-xs tracking-wide",
        md: "h-11 px-5",
        lg: "h-12 px-7 text-[15px]",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { buttonVariants };
