import { create } from "zustand";

type Panel = "cart" | "search" | "nav" | "account" | null;

type UiState = {
  panel: Panel;
  open: (panel: Panel) => void;
  close: () => void;
};

export const useUi = create<UiState>((set) => ({
  panel: null,
  open: (panel) => set({ panel }),
  close: () => set({ panel: null }),
}));
