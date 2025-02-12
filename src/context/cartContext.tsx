import { createContext, useState, useContext } from "react";

const CartContext = createContext({ cart: [], addToCart: (cartItem) => {} });

export default function CartProvider({ children }) {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(cartItem: any) {
    setCart((prevCart) => [...prevCart, cartItem]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
