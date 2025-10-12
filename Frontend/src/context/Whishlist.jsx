import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
  try {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error("Failed to parse wishlist from localStorage", error);
    return [];
  }
});
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev; 
    });
  };
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
export const useWishlist = () => useContext(WishlistContext);
