import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QtySelector({
  value,
  onChange,
  min = 1,
  max = 20,
  className,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center rounded-md border border-line bg-paper",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className="flex size-10 items-center justify-center text-ink-soft hover:text-ink"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="size-3.5" />
      </button>
      <span className="min-w-6 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="flex size-10 items-center justify-center text-ink-soft hover:text-ink"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
