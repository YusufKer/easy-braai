import { useCart } from "../context/cartContext";
import CartItem from "../components/Cart/CartItem";
import Button from "../components/Button";
import Heading from "../components/Heading";

export default function Cart() {
  const cartStore = useCart();
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
        <Button handleClick={() => {}} type="success">
          Checkout
        </Button>
      </div>
    </div>
  );
}
