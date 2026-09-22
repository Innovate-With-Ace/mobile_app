import { Dish } from "@/types/Dish";
import { CartItem } from "@/types/Cart";
import React, { createContext, useContext, useMemo, useState } from "react";

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addDish: (dish: Dish, quantity?: number) => void;
  incrementItem: (dishId: string) => void;
  decrementItem: (dishId: string) => void;
  removeItem: (dishId: string) => void;
  clearCart: () => void;
  getQuantity: (dishId: string) => number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addDish = (dish: Dish, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.dishId === dish.id);
      const cap = dish.servings_left;
      if (existing) {
        return prev.map((i) =>
          i.dishId === dish.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, cap) }
            : i
        );
      }
      return [
        ...prev,
        {
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          quantity: Math.min(quantity, cap),
          servingsLeft: cap,
          image: dish.image,
        },
      ];
    });
  };

  const incrementItem = (dishId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.dishId === dishId
          ? { ...i, quantity: Math.min(i.quantity + 1, i.servingsLeft) }
          : i
      )
    );
  };

  const decrementItem = (dishId: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.dishId === dishId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (dishId: string) => {
    setItems((prev) => prev.filter((i) => i.dishId !== dishId));
  };

  const clearCart = () => setItems([]);

  const getQuantity = (dishId: string) =>
    items.find((i) => i.dishId === dishId)?.quantity ?? 0;

  const totalQuantity = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity * i.price, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        totalPrice,
        addDish,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
