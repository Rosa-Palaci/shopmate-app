import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type ProductBase = {
  id: string;
  name: string;
  price: number;
  // Puedes usar string (URL) o cualquier cosa de require() local
  image?: any; // string | ImageSourcePropType
};

export type CartItem = ProductBase & {
  qty: number;
};

type CartContextValue = {
  cart: CartItem[];
  addToCart: (item: ProductBase, qty?: number) => void;
  updateQuantity: (id: string, qty: number) => void; // si qty === 0, elimina
  total: number;
  count: number; // cantidad total de piezas
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: ProductBase, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        // elimina
        return prev.filter((p) => p.id !== id);
      }
      return prev.map((p) => (p.id === id ? { ...p, qty } : p));
    });
  };

  const clearCart = () => setCart([]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const value: CartContextValue = {
    cart,
    addToCart,
    updateQuantity,
    total,
    count,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
