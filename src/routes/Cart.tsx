import { useCartStore } from "../context/cartStore";
import CartItem from "../components/Cart/CartItem";
import Button from "../components/Button";
import Heading from "../components/Heading";

export default function Cart() {
  const cartStore = useCartStore();

  function handleCheckout() {
    const toSend = cartStore?.cart?.map((cartItem) => {
      // @ts-expect-error
      const { id, ...newCartItem } = { ...cartItem };
      newCartItem.plate = cartItem.plate.map((plateItem) => {
        // @ts-expect-error
        const { flavour, cut, id, price, ...rest } = plateItem;
        return rest;
      });
      return newCartItem;
    });
    console.log(toSend);
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
        <Button handleClick={handleCheckout} type="success">
          Checkout
        </Button>
      </div>
    </div>
  );
}
