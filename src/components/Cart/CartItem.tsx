import { CartItem } from "../../context/cartContext";
import { useCart } from "../../context/cartContext";
import Button from "../Button";

type CartItemProps = {
  cartItem: CartItem;
  cartItemID: string;
};

export default function CartItemCard({ cartItem, cartItemID }: CartItemProps) {
  const cartStore = useCart();

  function deletePlateFromCart(cartItemID: string) {
    cartStore?.deletePlateFromCart(cartItemID);
  }

  return (
    <div className="bg-white rounded">
      {cartItem.plate.map((lineItem) => (
        <div key={lineItem.id} className="px-4 py-2 flex justify-between">
          <div className="flex gap-4 items-center">
            <div>
              {lineItem.meat} ({lineItem.cut}) ({lineItem.flavour})
            </div>
          </div>
          <div>R{lineItem.price}</div>
        </div>
      ))}
      <div className="flex justify-between px-4 py-2 border-t border-gray-200">
        <p>
          {cartItem.numberOfPlates} plate {cartItem.numberOfPlates > 1 && "s"}{" "}
          at R{cartItem.plate.reduce((acc, item) => acc + item.price, 0)}
        </p>
        <div>Total: R{cartItem.total}</div>
      </div>
      <div className="p-2 px-4 flex gap-2">
        <Button type="warning" handleClick={() => {}}>
          Edit Plate
        </Button>
        <Button
          handleClick={() => deletePlateFromCart(cartItemID)}
          type="danger"
        >
          Delete Plate
        </Button>
      </div>
    </div>
  );
}
