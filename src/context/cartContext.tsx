import { createContext, useState, useContext } from "react";
import { PlateItem } from "../components/BuildAPlate/PlateBuilder";

type CartContextType = {
  cart: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  deleteItemFromPlate: (cartItemID: string, lineItemID: string) => void;
  deletePlateFromCart: (cartItemID: string) => void;
  grandTotal: number;
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
  const grandTotal = cart.reduce((acc, item) => acc + item.total, 0);

  function addToCart(cartItem: CartItem) {
    setCart((prevCart) => [...prevCart, cartItem]);
  }

  function deleteItemFromPlate(cartItemID: string, plateItemId: string) {
    setCart((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.id === cartItemID) {
          cartItem.plate = cartItem.plate.filter(
            (item) => item.id !== plateItemId
          );
          cartItem.total =
            cartItem.plate.reduce((sum, item) => sum + item.price, 0) *
            cartItem.numberOfPlates;
        }
        return cartItem;
      });
    });
  }

  function deletePlateFromCart(cartItemID: string) {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== cartItemID)
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteItemFromPlate,
        deletePlateFromCart,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
