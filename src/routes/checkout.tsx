import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useCart, resolveCart, cartTotal } from "@/lib/cart-store";
import { formatINR, pageTitle, SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { cartOrderMessage, openWhatsApp, type CustomerDetails } from "@/lib/whatsapp";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: pageTitle("Checkout") }] }),
});

const STORAGE = "shobhas-magic-customer";
const EMPTY: CustomerDetails = { name: "", phone: "", address: "", city: "", pincode: "" };

function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const resolved = resolveCart(lines);
  const total = cartTotal(lines);
  const [form, setForm] = useState<CustomerDetails>(EMPTY);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setForm(JSON.parse(raw) as CustomerDetails);
    } catch {
      /* ignore */
    }
  }, []);

  function set<K extends keyof CustomerDetails>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE, JSON.stringify(form));
    } catch {
      /* ignore */
    }
    openWhatsApp(cartOrderMessage(resolved, total, form));
  }

  if (!resolved.length) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-serif text-4xl">Checkout</h1>
        <p className="mt-3 text-muted">Your cart is empty.</p>
        <Button className="mt-6" asChild>
          <Link to="/shop">Shop collection</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_20rem]">
      <div>
        <h1 className="font-serif text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-muted">
          Confirm your details, then we open WhatsApp with the full order. No account required.
        </p>
        <form className="mt-8 space-y-4" onSubmit={submit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              required
              className="mt-1.5"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              required
              type="tel"
              className="mt-1.5"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="address">Delivery address</Label>
            <Textarea
              id="address"
              required
              className="mt-1.5"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                required
                className="mt-1.5"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                required
                className="mt-1.5"
                value={form.pincode}
                onChange={(e) => set("pincode", e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" variant="whatsapp" size="lg" className="w-full">
            Generate WhatsApp order
          </Button>
          <p className="text-center text-xs text-muted">
            We’ll confirm availability and delivery on {SITE.phoneDisplay}
          </p>
        </form>
      </div>
      <aside className="h-fit rounded-xl bg-card p-5 ring-1 ring-line">
        <h2 className="font-serif text-2xl">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {resolved.map((l) => (
            <li key={`${l.productId}-${l.variantId}`} className="flex justify-between gap-3">
              <span>
                {l.product.name} · {l.variant.label} · ×{l.quantity}
              </span>
              <span className="tabular-nums">{formatINR(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-line pt-4 font-serif text-2xl">
          <span>Total</span>
          <span className="tabular-nums">{formatINR(total)}</span>
        </p>
        <Link to="/cart" className="mt-3 inline-block text-xs text-muted underline-offset-4 hover:underline">
          Edit cart
        </Link>
      </aside>
    </main>
  );
}
