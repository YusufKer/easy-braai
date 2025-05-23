import { getFunctions, httpsCallable } from "firebase/functions";
import { useCartStore } from "../../context/cartStore";
import Heading from "../Heading";
import { useEffect } from "react";

type CheckoutStepOneProps = {
  address: string;
};

export default function CheckoutStepOne(props: CheckoutStepOneProps) {
  const cartStore = useCartStore();

  //   useEffect(() => {
  //     (async function () {
  //       try {
  //         console.log("Creating order...");
  //         const toSend = cartStore?.cart?.map((cartItem) => {
  //           const { id, ...newCartItem } = { ...cartItem };
  //           newCartItem.plate = cartItem.plate.map((plateItem) => {
  //             // strip some data from the plate item as they need to be verified on the server
  //             const { flavour, cut, id, price, ...rest } = plateItem;
  //             return rest;
  //           });
  //           return newCartItem;
  //         });
  //         const functions = getFunctions();
  //         const createOrder = httpsCallable(functions, "createOrder");
  //         const response = await createOrder(toSend);
  //         console.log(response);
  //       } catch (error) {
  //         console.error("Error creating order:", error);
  //       }
  //     })();
  //   });

  /*
        Todo:
        [ ] Does the user have an address set?
        [ ] Is this the delivery address?
            [ ] No: Allow the user to add an address for delivery (This will only be saved to the order bu to the users account)
        [ ] Allow the user to select a delivery Date and time (Times will be in 2 hour blocks)
        [ ] Calculate the delivery fee based on the distance from the store to the delivery address
    */
  return (
    <div>
      <Heading>Cart Summary</Heading>
      {cartStore?.cart.map((cartItem) => (
        <div key={cartItem.id} className="flex justify-between items-center">
          <span>Plates:{cartItem.numberOfPlates}</span>
          <span>Total:{cartItem.total}</span>
        </div>
      ))}
    </div>
  );
}
