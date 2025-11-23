import { create } from "zustand";

export type ProductBase = {
  id: string;
  name: string;
  price: number;
  image?: any;
};

export type CartItem = ProductBase & {
  qty: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: ProductBase, qty?: number) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
};

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item, qty = 1) => {
    set((state) => {
      const existing = state.cart.find((p) => p.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((p) =>
            p.id === item.id ? { ...p, qty: p.qty + qty } : p
          ),
        };
      }

      return { cart: [...state.cart, { ...item, qty }] };
    });
  },
  updateQuantity: (id, qty) => {
    set((state) => {
      if (qty <= 0) {
        return { cart: state.cart.filter((p) => p.id !== id) };
      }

      return {
        cart: state.cart.map((p) => (p.id === id ? { ...p, qty } : p)),
      };
    });
  },
  clearCart: () => set({ cart: [] }),
}));

export const useCart = () =>
  useCartStore((state) => ({
    cart: state.cart,
    addToCart: state.addToCart,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
    total: state.cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    count: state.cart.reduce((sum, item) => sum + item.qty, 0),
  }));

export default useCartStore;
export { useCartStore };
