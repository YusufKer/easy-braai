import { useCartStore } from "../context/cartStore";
import { useAuthStore } from "../context/authStore";

import CartItem from "../components/Cart/CartItem";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { NavLink } from "react-router";

export default function Cart() {
  const cartStore = useCartStore();
  const auth = useAuthStore();

  if (!auth?.user) {
    return <p>Please login to view your cart</p>;
  }

  return (
    <div className="space-y-4">
      <Heading headingType="main">Your cart</Heading>
      {cartStore?.cart.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          cartItemID={cartItem.id}
        />
      ))}
      <div className="flex justify-between items-center">
        <p>Final Total: {cartStore?.grandTotal}</p>
        <NavLink to="/checkout">
          <Button type="success">Start Checkout</Button>
        </NavLink>
      </div>
    </div>
  );
}
