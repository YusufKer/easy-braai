import { useCart } from "../context/cartContext";
import CartItem from "../components/Cart/CartItem";

export default function Cart() {
  const cartStore = useCart();
  return (
    <div className="space-y-4">
      <h1>This is your cart...</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
        reiciendis enim quos! Nostrum, exercitationem nemo voluptate suscipit
        optio repellendus vero harum aliquam consequuntur eius, necessitatibus
        excepturi temporibus? Minus, ut eveniet.
      </p>
      {cartStore?.cart.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="flex justify-end">
        <button className="bg-green-400 rounded px-4 py-2">Checkout</button>
      </div>
    </div>
  );
}
