import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WishlistProvider } from "./context/Whishlist"; // spelling confirm kar lena
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider> 
        <App />
      </CartProvider>
    </WishlistProvider>
  </StrictMode>
);
