import { useCart } from "../context/cartContext";
import CartItem from "../components/Cart/CartItem";

export default function Cart() {
  const cartStore = useCart();
  return (
    <div className="space-y-4">
      <h1>Your cart</h1>
      {cartStore?.cart.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          cartItemID={cartItem.id}
        />
      ))}
      <div className="flex justify-between items-center">
        <p>Final Total: {cartStore?.grandTotal}</p>
        <button className="bg-green-400 rounded px-4 py-2">Checkout</button>
      </div>
    </div>
  );
}
