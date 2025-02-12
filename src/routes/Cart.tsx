import { useCart } from "../context/cartContext";

export default function Cart() {
  const cartStore = useCart();

  console.log(cartStore.cart);
  return (
    <div>
      <h1>This is your cart...</h1>
      <div>
        {cartStore.cart.map((plate) => (
          <div>{}</div>
        )}
      </div>
    </div>
  );
}
