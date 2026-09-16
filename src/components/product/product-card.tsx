import { Heart } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "@/lib/catalog";
import { defaultVariant, minPrice } from "@/lib/catalog";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { formatINR } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QtySelector } from "@/components/product/qty-selector";
import { VariantPills } from "@/components/product/variant-pills";
import { notifyMessage, openWhatsApp } from "@/lib/whatsapp";
import { useUi } from "@/lib/ui-store";

export function ProductCard({ product }: { product: Product }) {
  const coming = product.status === "coming-soon";
  const initial = defaultVariant(product);
  const [variantId, setVariantId] = useState(initial?.id ?? "");
  const [qty, setQty] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId) ?? initial;
  const add = useCart((s) => s.add);
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const toggleWish = useWishlist((s) => s.toggle);
  const openCart = useUi((s) => s.open);

  function onAdd(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!variant || coming) return;
    add(product.id, variant.id, qty);
    toast.success(`${product.name} added to cart`, {
      action: {
        label: "View",
        onClick: () => openCart("cart"),
      },
    });
  }

  return (
    <article className="group flex flex-col rounded-xl bg-card shadow-[var(--shadow-soft)] ring-1 ring-line/80">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden rounded-t-xl"
      >
        <div className="aspect-4/5 overflow-hidden bg-cream">
          <img
            src={product.images[0]}
            alt={product.name}
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
        {coming ? (
          <Badge tone="forest" className="absolute top-3 left-3">
            Coming soon
          </Badge>
        ) : null}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWish(product.id);
          }}
          className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm backdrop-blur-sm"
        >
          <Heart className={cn("size-4", wished && "fill-terracotta text-terracotta")} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="font-serif text-2xl leading-tight text-ink hover:text-forest"
          >
            {product.name}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{product.description}</p>
        </div>

        <p className="font-medium tabular-nums text-ink">
          {coming ? "Join the list" : `From ${formatINR(minPrice(product))}`}
        </p>

        {!coming && product.variants.length > 1 ? (
          <VariantPills variants={product.variants} value={variantId} onChange={setVariantId} />
        ) : null}

        {coming ? (
          <Button variant="outline" onClick={() => openWhatsApp(notifyMessage(product.name))}>
            Notify on WhatsApp
          </Button>
        ) : (
          <div className="mt-auto flex items-center gap-2">
            <QtySelector value={qty} onChange={setQty} />
            <Button className="flex-1" onClick={onAdd}>
              Add to cart
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <p className="py-16 text-center text-muted">
        Nothing in this collection yet. Browse the full shop, or write to us.
      </p>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
