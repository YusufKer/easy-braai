import { CartItem } from "../../context/cartStore";
import AddToPlate from "../BuildAPlate/AddToPlate";
import { PlateItem } from "../BuildAPlate/PlateBuilder";
import PlateTable from "../BuildAPlate/PlateTable";
import Button from "../Button";
import Heading from "../Heading";
import { useCartStore } from "../../context/cartStore";

type EditCartModalProps = {
  cartItem: CartItem;
  closeModal: () => void;
};

export default function EditCartModal({
  cartItem,
  closeModal,
}: EditCartModalProps) {
  const cartStore = useCartStore();

  function preventDefault(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function handleDelete(plateItemID: string) {
    const thePlate = cartStore?.cart?.find(
      (item) => item?.id === cartItem?.id
    )?.plate;
    if (thePlate && thePlate.length === 1) {
      cartStore.deletePlateFromCart(cartItem.id);
      closeModal();
    } else {
      cartStore?.deleteItemFromPlateViaCart(cartItem.id, plateItemID);
    }
  }

  function addToPlate(plateItem: PlateItem) {
    cartStore?.addItemToPlateViaCart(cartItem.id, plateItem);
  }
  // TODO: Add ability to adjust the number of guests
  return (
    <div
      onClick={closeModal}
      className="flex bg-black/35 absolute top-0 left-0 w-full h-full items-center justify-center p-4"
    >
      <div
        className="bg-white space-y-4 p-4 sm:min-w-[600px]"
        onClick={preventDefault}
      >
        <div className="flex justify-between gap-4 items-center">
          <Heading>Edit plate</Heading>
          <Button type="warning" handleClick={closeModal}>
            Close
          </Button>
        </div>
        <PlateTable plate={cartItem.plate} handleDelete={handleDelete} />
        <AddToPlate addToPlate={addToPlate} />
        <div>
          Number of plates{" "}
          <input
            type="number"
            defaultValue={cartItem.numberOfPlates}
            onChange={(e) =>
              cartStore?.changeNumberOfPlatesForCartItem(
                cartItem.id,
                parseInt(e.target.value)
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
