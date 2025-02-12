import { createContext, useState, useContext } from "react";
import { PlateItem } from "../components/BuildYourPlate/PlateBuilder";

type CartContextType = {
  cart: CartItem[];
  addToCart: (cartOItem: CartItem) => void;
};

export type CartItem = {
  id: string;
  plate: PlateItem[];
  numberOfPlates: number;
  total: number;
};

type CartProviderProps = {
  children: React.ReactNode;
};

const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(cartItem: CartItem) {
    setCart((prevCart) => [...prevCart, cartItem]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
