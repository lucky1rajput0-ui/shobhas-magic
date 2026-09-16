import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp, MobileCartBar } from "@/components/layout/floating-actions";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchDialog } from "@/components/search/search-dialog";
import { AccountDialog } from "@/components/layout/account-dialog";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";

export function SiteShell({ children }: { children: ReactNode }) {
  const hydrateCart = useCart((s) => s.setHydrated);
  const hydrateWish = useWishlist((s) => s.setHydrated);

  useEffect(() => {
    if (useCart.persist.hasHydrated()) hydrateCart();
    const unsubCart = useCart.persist.onFinishHydration(() => hydrateCart());
    if (useWishlist.persist.hasHydrated()) hydrateWish();
    const unsubWish = useWishlist.persist.onFinishHydration(() => hydrateWish());
    return () => {
      unsubCart();
      unsubWish();
    };
  }, [hydrateCart, hydrateWish]);

  return (
    <div className="flex min-h-dvh flex-col bg-ivory text-ink">
      <SiteHeader />
      <div className="flex-1 pb-20 md:pb-0">{children}</div>
      <SiteFooter />
      <CartDrawer />
      <SearchDialog />
      <AccountDialog />
      <FloatingWhatsApp />
      <MobileCartBar />
      <Toaster position="top-center" toastOptions={{ className: "font-sans" }} />
    </div>
  );
}
