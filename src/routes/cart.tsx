import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, resolveCart, cartTotal, cartCount } from "@/lib/cart-store";
import { formatINR, pageTitle } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { QtySelector } from "@/components/product/qty-selector";
import { cartOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import { asset } from "@/lib/asset";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: pageTitle("Cart") }] }),
});

export function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const resolved = resolveCart(lines);
  const total = cartTotal(lines);
  const count = cartCount(lines);

  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl">Your cart</h1>
      {resolved.length === 0 ? (
        <div className="mt-10 rounded-xl bg-card p-10 text-center ring-1 ring-line">
          <p className="font-serif text-2xl">Nothing here yet</p>
          <p className="mt-2 text-muted">Add a few sweets, then order on WhatsApp.</p>
          <Button className="mt-6" asChild>
            <Link to="/shop">Shop collection</Link>
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-line">
            {resolved.map((l) => (
              <li key={`${l.productId}-${l.variantId}`} className="flex gap-4 py-5">
                <img src={asset(l.product.images[0])} alt="" className="size-24 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <Link
                    to="/product/$slug"
                    params={{ slug: l.product.slug }}
                    className="font-serif text-xl"
                  >
                    {l.product.name}
                  </Link>
                  <p className="text-sm text-muted">{l.variant.label}</p>
                  <p className="mt-1 text-sm tabular-nums">{formatINR(l.variant.price)} each</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <QtySelector
                      value={l.quantity}
                      onChange={(n) => setQuantity(l.productId, l.variantId, n)}
                    />
                    <button
                      type="button"
                      className="text-xs text-muted underline-offset-4 hover:underline"
                      onClick={() => remove(l.productId, l.variantId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-medium tabular-nums">{formatINR(l.lineTotal)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 rounded-xl bg-paper p-6 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted">{count} item{count === 1 ? "" : "s"}</p>
              <p className="font-serif text-3xl tabular-nums">{formatINR(total)}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="whatsapp"
                onClick={() => openWhatsApp(cartOrderMessage(resolved, total))}
              >
                Order on WhatsApp
              </Button>
              <Button variant="ink" asChild>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
