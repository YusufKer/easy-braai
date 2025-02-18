import { createContext, useState, useContext } from "react";
import { PlateItem } from "../components/BuildAPlate/PlateBuilder";

type CartContextType = {
  cart: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  addItemToPlateViaCart: (cartItemID: string, plateItem: PlateItem) => void;
  deleteItemFromPlateViaCart: (cartItemID: string, lineItemID: string) => void;
  deletePlateFromCart: (cartItemID: string) => void;
  changeNumberOfPlatesForCartItem: (
    CartItemID: string,
    newNumberOfPlates: number
  ) => void;
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

  function deleteItemFromPlateViaCart(cartItemID: string, plateItemId: string) {
    setCart((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.id === cartItemID) {
          const newCartItem = { ...cartItem };
          newCartItem.plate = newCartItem.plate.filter(
            (item) => item.id !== plateItemId
          );
          newCartItem.total =
            newCartItem.plate.reduce((sum, item) => sum + item.price, 0) *
            newCartItem.numberOfPlates;
          return newCartItem;
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

  function addItemToPlateViaCart(cartItemID: string, plateItem: PlateItem) {
    setCart((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.id === cartItemID) {
          const newCartItem = { ...cartItem };
          newCartItem.plate = [...newCartItem.plate, plateItem];
          newCartItem.total =
            newCartItem.plate.reduce((sum, item) => sum + item.price, 0) *
            newCartItem.numberOfPlates;
          return newCartItem;
        }
        return cartItem;
      });
    });
  }

  function changeNumberOfPlatesForCartItem(
    cartItemID: string,
    newNumberOfPlates: number
  ) {
    setCart((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.id === cartItemID) {
          const newCartItem = { ...cartItem };
          newCartItem.numberOfPlates = newNumberOfPlates;
          newCartItem.total =
            newCartItem.plate.reduce((sum, item) => sum + item.price, 0) *
            newNumberOfPlates;
          return newCartItem;
        }
        return cartItem;
      });
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteItemFromPlateViaCart,
        deletePlateFromCart,
        addItemToPlateViaCart,
        changeNumberOfPlatesForCartItem,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartStore = () => useContext(CartContext);
