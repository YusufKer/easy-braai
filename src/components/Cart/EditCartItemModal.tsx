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
        className="bg-[#ffcf50] space-y-4 p-4 sm:min-w-[600px] rounded"
        onClick={preventDefault}
      >
        <div className="flex justify-between gap-4 items-center">
          <Heading>Edit plate</Heading>
          <Button type="warning" handleClick={closeModal} round>
            <i className="fa-solid fa-close text-xs"></i>
          </Button>
        </div>
        <div className="max-h-[200px] md:max-h-full overflow-auto">
          <PlateTable plate={cartItem.plate} handleDelete={handleDelete} />
        </div>
        <AddToPlate addToPlate={addToPlate} />
        <div className="border-t pt-4 border-[#b01218] flex gap-4 items-center">
          <span>Number of plates </span>
          <input
            type="number"
            defaultValue={cartItem.numberOfPlates}
            onChange={(e) =>
              cartStore?.changeNumberOfPlatesForCartItem(
                cartItem.id,
                parseInt(e.target.value)
              )
            }
            className="bg-white px-4 py-2 rounded"
          />
        </div>
      </div>
    </div>
  );
}
