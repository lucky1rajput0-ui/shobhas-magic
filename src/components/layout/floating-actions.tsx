import { MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SITE, formatINR } from "@/lib/site";
import { useCart, cartCount, cartTotal } from "@/lib/cart-store";
import { useUi } from "@/lib/ui-store";
import { waLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(`Hello ${SITE.name}! I would like some help with an order.`)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-20 z-40 flex size-14 items-center justify-center rounded-full bg-[#1f6b46] text-ivory shadow-[var(--shadow-lift)] md:bottom-6"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}

export function MobileCartBar() {
  const lines = useCart((s) => s.lines);
  const hydrated = useCart((s) => s.hydrated);
  const open = useUi((s) => s.open);
  const count = cartCount(lines);
  const total = cartTotal(lines);
  if (!hydrated || count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 p-3 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => open("cart")}
          className="flex min-h-12 flex-1 items-center justify-between rounded-md bg-forest px-4 text-sm text-ivory"
        >
          <span>
            {count} item{count === 1 ? "" : "s"} · {formatINR(total)}
          </span>
          <span className="font-medium">View cart</span>
        </button>
        <Link
          to="/checkout"
          className="flex min-h-12 items-center rounded-md bg-ink px-4 text-sm text-ivory"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
