import { useCartStore } from "../context/cartStore";
import { useAuthStore } from "../context/authStore";
import { getFunctions, httpsCallable } from "firebase/functions";
import CartItem from "../components/Cart/CartItem";
import Button from "../components/Button";
import Heading from "../components/Heading";

export default function Cart() {
  const cartStore = useCartStore();
  const auth = useAuthStore();

  async function handleCheckout() {
    const functions = getFunctions();
    const createOrder = httpsCallable(functions, "createOrder");

    const toSend = cartStore?.cart?.map((cartItem) => {
      const { id, ...newCartItem } = { ...cartItem };
      // @ts-ignore
      newCartItem.plate = cartItem.plate.map((plateItem) => {
        const { flavour, cut, id, price, ...rest } = plateItem;
        return rest;
      });
      return newCartItem;

      /*
        TODO:

        [ ] This function should send the cart data to a cloud function that will process the cart
        
        [ ] If successful, the function should:
          [ ] Redirect to the payment page
        
        [ ] If unsuccessful, the function should:
          [ ] Display an error message
          [ ] Allow the user to try again
      */
    });

    console.log(await createOrder(toSend));
    /*

      TODO:
      
      [ ] Send the data to a cloud function that will process the cart
      [ ] The function should validate the order information
      [ ] The function should take the data and create an order

      [ ] If successful, the function should:
        [ ] return a success message "Order created" 
        [ ] return an order number 
        [ ] return a link to the order
        [ ] send a link yo start the payment process

      [ ] If unsuccessful, the function should:
        [ ] return an error message "Order not created"
        
    */
  }

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
        <Button handleClick={handleCheckout} type="success">
          Checkout
        </Button>
      </div>
    </div>
  );
}
