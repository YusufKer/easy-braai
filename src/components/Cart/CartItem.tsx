import { CartItem } from "../../context/cartContext";

type CartItemProps = {
  cartItem: CartItem;
};

export default function CartItemCard({ cartItem }: CartItemProps) {
  return (
    <div className="bg-white rounded">
      {cartItem.plate.map((lineItem) => (
        <div key={lineItem.id} className="p-2 md:p-4 flex justify-between">
          <div className="flex gap-4 items-center">
            <div>{lineItem.meat}</div>
            <div>{lineItem.cut}</div>
            <div>{lineItem.flavour}</div>
          </div>
          <button className="bg-red-400 rounded px-4 py-2">Delete</button>
        </div>
      ))}
      <div className="flex justify-between p-2 md:p-4 border-t border-gray-200">
        <div>{cartItem.numberOfPlates} plates</div>
        <div>Total: R{cartItem.total}</div>
      </div>
    </div>
  );
}
