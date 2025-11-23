import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  customer_id: string | null;
  setCustomerId: (id: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customer_id: null,
      setCustomerId: (id: string) => set({ customer_id: id }),
      logout: () => set({ customer_id: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
