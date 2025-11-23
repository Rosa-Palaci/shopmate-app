import { create } from "zustand";

interface AuthState {
  customerId: string | null;
  setCustomerId: (id: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  customerId: null,
  setCustomerId: (id: string) => set({ customerId: id }),
}));
