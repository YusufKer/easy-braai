import { CartItem } from "../../context/cartStore";
import { useCartStore } from "../../context/cartStore";
import Button from "../Button";
import EditCartItemModal from "./EditCartItemModal";
import { useState } from "react";

type CartItemProps = {
  cartItem: CartItem;
  cartItemID: string;
};

export default function CartItemCard({ cartItem, cartItemID }: CartItemProps) {
  const [showModal, setShowModal] = useState(false);
  const cartStore = useCartStore();

  function deletePlateFromCart(cartItemID: string) {
    cartStore?.deletePlateFromCart(cartItemID);
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <EditCartItemModal cartItem={cartItem} closeModal={closeModal} />
      )}
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
          <Button type="warning" handleClick={openModal}>
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
    </>
  );
}
