import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ load from localStorage
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    toast.success("Item added to cart 🛒");
  };

  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
    toast.info("Removed from cart");
  };

  const updateQty = (id, size, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  // Clear the cart after order has been placed.
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);