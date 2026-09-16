import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  ids: string[];
  hydrated: boolean;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  setHydrated: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      hydrated: false,
      toggle: (productId) => {
        const ids = get().ids;
        set({
          ids: ids.includes(productId)
            ? ids.filter((id) => id !== productId)
            : [...ids, productId],
        });
      },
      has: (productId) => get().ids.includes(productId),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "shobhas-magic-wishlist",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
