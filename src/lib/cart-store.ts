import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductById, type Product, type ProductVariant } from "@/lib/catalog";

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type ResolvedLine = CartLine & {
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
};

type CartState = {
  lines: CartLine[];
  hydrated: boolean;
  add: (productId: string, variantId: string, quantity?: number) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  remove: (productId: string, variantId: string) => void;
  clear: () => void;
  setHydrated: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      hydrated: false,
      add: (productId, variantId, quantity = 1) => {
        const lines = [...get().lines];
        const i = lines.findIndex(
          (l) => l.productId === productId && l.variantId === variantId,
        );
        if (i >= 0) {
          lines[i] = { ...lines[i], quantity: lines[i].quantity + quantity };
        } else {
          lines.push({ productId, variantId, quantity });
        }
        set({ lines });
      },
      setQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          set({
            lines: get().lines.filter(
              (l) => !(l.productId === productId && l.variantId === variantId),
            ),
          });
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.productId === productId && l.variantId === variantId
              ? { ...l, quantity }
              : l,
          ),
        });
      },
      remove: (productId, variantId) =>
        set({
          lines: get().lines.filter(
            (l) => !(l.productId === productId && l.variantId === variantId),
          ),
        }),
      clear: () => set({ lines: [] }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "shobhas-magic-cart",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export function resolveCart(lines: CartLine[]): ResolvedLine[] {
  const resolved: ResolvedLine[] = [];
  for (const line of lines) {
    const product = getProductById(line.productId);
    const variant = product?.variants.find((v) => v.id === line.variantId);
    if (!product || !variant) continue;
    resolved.push({
      ...line,
      product,
      variant,
      lineTotal: variant.price * line.quantity,
    });
  }
  return resolved;
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.quantity, 0);
}

export function cartTotal(lines: CartLine[]) {
  return resolveCart(lines).reduce((n, l) => n + l.lineTotal, 0);
}
