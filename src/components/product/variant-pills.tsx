import type { ProductVariant } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function VariantPills({
  variants,
  value,
  onChange,
}: {
  variants: ProductVariant[];
  value: string;
  onChange: (id: string) => void;
}) {
  const usable = variants.filter((v) => v.price > 0 || v.inStock);
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Size">
      {usable.map((v) => {
        const selected = v.id === value;
        return (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={!v.inStock}
            onClick={() => onChange(v.id)}
            className={cn(
              "h-8 rounded-full border px-3 text-xs tracking-wide transition-colors duration-150",
              selected
                ? "border-ink bg-ink text-ivory"
                : "border-line bg-paper text-ink-soft hover:border-line-strong",
              !v.inStock && "opacity-40",
            )}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
