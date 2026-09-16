import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useCart, resolveCart, cartTotal, cartCount } from "@/lib/cart-store";
import { useUi } from "@/lib/ui-store";
import { formatINR } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { QtySelector } from "@/components/product/qty-selector";
import { cartOrderMessage, openWhatsApp } from "@/lib/whatsapp";

export function CartDrawer() {
  const panel = useUi((s) => s.panel);
  const close = useUi((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const resolved = resolveCart(lines);
  const total = cartTotal(lines);
  const count = cartCount(lines);

  return (
    <Dialog.Root open={panel === "cart"} onOpenChange={(o) => (o ? null : close())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-fade" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-ivory shadow-[var(--shadow-lift)] data-[state=open]:animate-rise focus:outline-none">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Dialog.Title className="font-serif text-2xl">Your cart</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close cart"
                className="flex size-11 items-center justify-center rounded-full hover:bg-cream"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {resolved.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-serif text-2xl">The tin is empty</p>
                <p className="mt-2 text-sm text-muted">
                  Add a few sweets, then order on WhatsApp — no account needed.
                </p>
                <Button asChild className="mt-6" onClick={close}>
                  <Link to="/shop">Shop collection</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {resolved.map((l) => (
                  <li
                    key={`${l.productId}-${l.variantId}`}
                    className="flex gap-3 border-b border-line pb-4"
                  >
                    <img
                      src={l.product.images[0]}
                      alt=""
                      className="size-20 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-lg leading-tight">{l.product.name}</p>
                      <p className="text-xs text-muted">{l.variant.label}</p>
                      <p className="mt-1 text-sm tabular-nums">{formatINR(l.lineTotal)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <QtySelector
                          value={l.quantity}
                          onChange={(n) => setQuantity(l.productId, l.variantId, n)}
                        />
                        <button
                          type="button"
                          className="text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
                          onClick={() => remove(l.productId, l.variantId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {resolved.length > 0 ? (
            <div className="border-t border-line bg-paper px-5 py-4">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-sm text-muted">{count} item{count === 1 ? "" : "s"}</span>
                <span className="font-serif text-2xl tabular-nums">{formatINR(total)}</span>
              </div>
              <Button
                variant="whatsapp"
                className="w-full"
                onClick={() => openWhatsApp(cartOrderMessage(resolved, total))}
              >
                Order on WhatsApp
              </Button>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="outline" asChild onClick={close}>
                  <Link to="/cart">Review cart</Link>
                </Button>
                <Button variant="ink" asChild onClick={close}>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </div>
              <p className="mt-3 text-center text-xs text-muted">
                No account required. We confirm on WhatsApp.
              </p>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
