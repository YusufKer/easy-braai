import { CartItem } from "../../context/cartContext";
import { useCart } from "../../context/cartContext";

type CartItemProps = {
  cartItem: CartItem;
  cartItemID: string;
};

export default function CartItemCard({ cartItem, cartItemID }: CartItemProps) {
  const cartStore = useCart();

  function deleteItemFromPlate(cartItemID: string, lineItemID: string) {
    cartStore?.deleteItemFromPlate(cartItemID, lineItemID);
  }

  function deletePlateFromCart(cartItemID: string) {
    cartStore?.deletePlateFromCart(cartItemID);
  }

  return (
    <div className="bg-white rounded">
      {cartItem.plate.map((lineItem) => (
        <div key={lineItem.id} className="px-4 py-2 flex justify-between">
          <div className="flex gap-4 items-center">
            <div>{lineItem.meat}</div>
            <div>{lineItem.cut}</div>
            <div>{lineItem.flavour}</div>
          </div>
          {cartItem.plate.length > 1 ? (
            <button
              onClick={() => deleteItemFromPlate(cartItemID, lineItem.id)}
              className="bg-red-400 rounded px-4 py-2"
            >
              Delete
            </button>
          ) : (
            <div>R{lineItem.price}</div>
          )}
        </div>
      ))}
      <div className="flex justify-between px-4 py-2 border-t border-gray-200">
        <p>
          {cartItem.numberOfPlates} plate {cartItem.numberOfPlates > 1 && "s"}{" "}
          at R{cartItem.plate.reduce((acc, item) => acc + item.price, 0)}
        </p>
        <div>Total: R{cartItem.total}</div>
      </div>
      <div className="p-2 px-4">
        <button
          onClick={() => deletePlateFromCart(cartItemID)}
          className="bg-red-400 rounded px-4 py-2"
        >
          Delete Plate
        </button>
      </div>
    </div>
  );
}
