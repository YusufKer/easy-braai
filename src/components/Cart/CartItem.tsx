import { CartItem } from "../../context/cartContext";

type CartItemProps = {
  cartItem: CartItem;
};

export default function CartItemCard({ cartItem }: CartItemProps) {
  return cartItem.plate.map((lineItem) => (
    <div key={lineItem.id} className="bg-white">
      <div className="flex gap-4">
        <div>{lineItem.meat}</div>
        <div>{lineItem.cut}</div>
        <div>{lineItem.flavour}</div>
      </div>
    </div>
  ));
}
