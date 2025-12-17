import Heading from "@/components/Heading";
import { useCartStore } from "@/context/cartStore";
import Button from "@/components/Button";

export default function CheckoutStepOne() {
  const cartStore = useCartStore();

  function handleClick() {
    // send the order to the server.
    // go to the payment step
    console.log("Proceed to checkout:");
    console.log(cartStore?.cart);
  }
  return (
    <div>
      <Heading>Cart Summary</Heading>
      <div className="rounded overflow-hidden">
        {cartStore?.cart.map((cartItem) => (
          <div
            key={cartItem.id}
            className="flex justify-between items-center bg-amber-50 even:bg-amber-100 p-4"
          >
            <span>Plates:{cartItem.numberOfPlates}</span>
            <span>Total:{cartItem.total}</span>
          </div>
        ))}
      </div>
      <Button type="info" handleClick={handleClick}>
        Proceed to checkout
      </Button>
    </div>
  );
}
