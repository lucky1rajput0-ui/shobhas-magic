import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-paper px-3.5 text-sm text-ink placeholder:text-muted outline-none transition-colors duration-150 focus:border-saffron focus:ring-2 focus:ring-saffron/25",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-lg border border-line bg-paper px-3.5 py-3 text-sm text-ink placeholder:text-muted outline-none transition-colors duration-150 focus:border-saffron focus:ring-2 focus:ring-saffron/25",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-xs font-medium uppercase tracking-[0.14em] text-muted", className)}
      {...props}
    />
  );
}
