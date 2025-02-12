import { useCart } from "../context/cartContext";
import CartItem from "../components/Cart/CartItem";

export default function Cart() {
  const cartStore = useCart();

  console.log(cartStore?.cart);
  return (
    <div>
      <h1>This is your cart...</h1>
      <div className="bg-gray-700 p-4">
        {cartStore?.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
    </div>
  );
}
