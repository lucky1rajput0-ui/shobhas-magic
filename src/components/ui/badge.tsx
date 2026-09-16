import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "cream",
  ...props
}: React.ComponentProps<"span"> & { tone?: "cream" | "forest" | "saffron" | "ink" }) {
  const tones = {
    cream: "bg-cream text-ink-soft",
    forest: "bg-forest text-ivory",
    saffron: "bg-saffron/15 text-saffron",
    ink: "bg-ink text-ivory",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
