import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  defaultVariant,
  getProductBySlug,
  relatedProducts,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { useUi } from "@/lib/ui-store";
import { formatINR, pageTitle, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QtySelector } from "@/components/product/qty-selector";
import { VariantPills } from "@/components/product/variant-pills";
import { ProductGrid } from "@/components/product/product-card";
import { cartOrderMessage, notifyMessage, openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle(loaderData?.product.name) },
      {
        name: "description",
        content: loaderData?.product.longDescription.slice(0, 160),
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const coming = product.status === "coming-soon";
  const initial = defaultVariant(product);
  const [variantId, setVariantId] = useState(initial?.id ?? "");
  const [qty, setQty] = useState(1);
  const [photo, setPhoto] = useState(0);
  const variant = product.variants.find((v) => v.id === variantId) ?? initial;
  const add = useCart((s) => s.add);
  const openCart = useUi((s) => s.open);
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const toggleWish = useWishlist((s) => s.toggle);
  const related = relatedProducts(product);

  function addToCart() {
    if (!variant || coming) return;
    add(product.id, variant.id, qty);
    toast.success(`${product.name} added to cart`);
    openCart("cart");
  }

  function orderThis() {
    if (!variant || coming) return;
    openWhatsApp(
      cartOrderMessage(
        [
          {
            productId: product.id,
            variantId: variant.id,
            quantity: qty,
            product,
            variant,
            lineTotal: variant.price * qty,
          },
        ],
        variant.price * qty,
      ),
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="text-xs text-muted">
        <Link to="/" className="hover:text-ink">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-xl bg-cream">
            <img
              src={product.images[photo] ?? product.images[0]}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          {product.images.length > 1 ? (
            <div className="mt-3 flex gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setPhoto(i)}
                  className={cn(
                    "size-16 overflow-hidden rounded-md ring-1 ring-line",
                    i === photo && "ring-2 ring-ink",
                  )}
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          {coming ? <Badge tone="forest">Coming soon</Badge> : <Badge tone="saffron">Made in Kolkata</Badge>}
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-2 text-lg text-muted">{product.tagline}</p>
          {!coming && variant ? (
            <p className="mt-5 font-serif text-3xl tabular-nums">{formatINR(variant.price)}</p>
          ) : null}

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">{product.description}</p>

          {!coming ? (
            <div className="mt-6 space-y-4">
              <div>
                <p className="mb-2 text-xs tracking-[0.16em] text-muted uppercase">Weight / size</p>
                <VariantPills variants={product.variants} value={variantId} onChange={setVariantId} />
              </div>
              <div>
                <p className="mb-2 text-xs tracking-[0.16em] text-muted uppercase">Quantity</p>
                <QtySelector value={qty} onChange={setQty} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="lg" onClick={addToCart}>
                  Add to cart
                </Button>
                <Button size="lg" variant="whatsapp" onClick={orderThis}>
                  Order on WhatsApp
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => toggleWish(product.id)}
                  aria-label="Wishlist"
                >
                  <Heart className={cn("size-4", wished && "fill-terracotta text-terracotta")} />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => {
                    void navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied");
                  }}
                >
                  <Share2 className="size-4" />
                </Button>
              </div>
              <p className="text-xs text-muted">
                No account needed. We confirm every order on WhatsApp · {SITE.phoneDisplay}
              </p>
            </div>
          ) : (
            <Button
              className="mt-6"
              variant="whatsapp"
              onClick={() => openWhatsApp(notifyMessage(product.name))}
            >
              Notify me on WhatsApp
            </Button>
          )}

          <dl className="mt-10 grid gap-4 border-t border-line pt-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">Origin</dt>
              <dd className="mt-1 text-ink-soft">{product.originNote}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">Shelf life</dt>
              <dd className="mt-1 text-ink-soft">{product.shelfLife}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">Storage</dt>
              <dd className="mt-1 text-ink-soft">{product.storage}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">Allergens</dt>
              <dd className="mt-1 text-ink-soft">
                {product.allergens.length ? product.allergens.join(", ") : "None listed"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <article className="mx-auto mt-16 max-w-3xl">
        <h2 className="font-serif text-3xl">The recipe, in our words</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">{product.longDescription}</p>
        <h3 className="mt-8 font-serif text-2xl">Ingredients</h3>
        <p className="mt-2 text-sm text-muted">{product.ingredients.join(" · ")}</p>
      </article>

      {related.length ? (
        <section className="mt-20">
          <h2 className="font-serif text-3xl">You may also like</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
