import React, { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id
        && item.size === product.size && item.color === product.color);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === product.size 
          && item.color === product.color
         ?
         { ...item, qty: item.qty + product.qty } : item
        );
      }
      return [...prev, { ...product, qty: product.qty}]; // Default qty to 1 if not provided
    });
  };

  // Remove item from cart
  const removeFromCart = (id,color,size) => {
    setCart((prev) => prev.filter((item) => !(item.id == id && item.size == size && item.color == color)));
  };

  // Clear all cart
  const clearCart = () => setCart([]);
 // Update item quantity
const updateQuantity = (id, qty, color, size) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id && item.size === size && item.color === color
        ? { ...item, qty: Math.max(1, qty) }
        : item
    )
  );
};
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart ,updateQuantity}}> 
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
