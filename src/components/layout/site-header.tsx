import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { useCart, cartCount } from "@/lib/cart-store";
import { useUi } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/gifting/festive", label: "Festive Gifting" },
  { to: "/gifting/wedding", label: "Wedding Gifting" },
  { to: "/gifting/corporate", label: "Corporate Gifting" },
  { to: "/our-story", label: "Our Story" },
  { to: "/contact", label: "Contact" },
] as const;

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex flex-col items-start leading-none">
      <span className="font-serif text-[1.35rem] tracking-[0.04em] text-ink sm:text-2xl">
        {SITE.nameCaps}
      </span>
      {!compact ? (
        <span className="mt-1 hidden max-w-[16rem] text-[10px] tracking-[0.14em] text-muted uppercase sm:block">
          {SITE.tagline}
        </span>
      ) : null}
    </Link>
  );
}

export function AnnouncementBar() {
  return (
    <div className="bg-forest text-ivory">
      <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[11px] tracking-[0.16em] uppercase">
        Authentic Indian flavours · Made in Kolkata · 30 Years of Culinary Tradition
      </p>
    </div>
  );
}

export function SiteHeader() {
  const count = useCart((s) => cartCount(s.lines));
  const hydrated = useCart((s) => s.hydrated);
  const open = useUi((s) => s.open);
  const panel = useUi((s) => s.panel);
  const close = useUi((s) => s.close);
  const shown = hydrated ? count : 0;

  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar />
      <div className="border-b border-line bg-ivory/95 backdrop-blur-md">
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.75rem] sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[13px] tracking-wide text-ink-soft transition-colors hover:text-ink"
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-ink" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <IconBtn label="Search" onClick={() => open("search")}>
              <Search className="size-5" />
            </IconBtn>
            <IconBtn label="Account" onClick={() => open("account")}>
              <User className="size-5" />
            </IconBtn>
            <IconBtn label="Cart" onClick={() => open("cart")}>
              <span className="relative">
                <ShoppingBag className="size-5" />
                {shown > 0 ? (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-saffron px-1 text-[10px] font-medium text-ivory tabular-nums">
                    {shown}
                  </span>
                ) : null}
              </span>
            </IconBtn>
            <IconBtn label="Menu" className="lg:hidden" onClick={() => open("nav")}>
              <Menu className="size-5" />
            </IconBtn>
          </div>
        </div>
      </div>

      <Dialog.Root open={panel === "nav"} onOpenChange={(o) => (o ? null : close())}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-fade" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[min(100%,20rem)] flex-col bg-ivory p-6 shadow-[var(--shadow-lift)] focus:outline-none">
            <div className="flex items-center justify-between">
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <Logo compact />
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="flex size-11 items-center justify-center rounded-full hover:bg-cream"
                >
                  <X className="size-5" />
                </button>
              </Dialog.Close>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={close}
                  className="rounded-md px-2 py-3 font-serif text-2xl text-ink hover:bg-cream"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="mt-auto text-xs tracking-wide text-muted">{SITE.tagline}</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}

function IconBtn({
  label,
  onClick,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex size-11 items-center justify-center rounded-full text-ink hover:bg-cream",
        className,
      )}
    >
      {children}
    </button>
  );
}
