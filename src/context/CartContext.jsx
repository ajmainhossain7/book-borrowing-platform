"use client";

import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((book) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === book.id);
      if (exists) {
        return prev.map((i) =>
          i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id, qty) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};