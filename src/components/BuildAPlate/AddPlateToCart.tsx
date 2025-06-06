import { PlateItem } from "./PlateBuilder";
import { ChangeEvent, useState } from "react";
import { useCartStore } from "../../context/cartStore";
import { useAuthStore } from "../../context/authStore";
import Button from "../Button";

type AddPlateToCartProps = {
  plate: PlateItem[];
  clearPlate: () => void;
};

export default function AddPlateToCart({
  plate,
  clearPlate,
}: AddPlateToCartProps) {
  const cartStore = useCartStore();
  const auth = useAuthStore();

  const [numberOfPlates, setNumberOfPlates] = useState(1);
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (isNaN(parseInt(e.target.value))) return setNumberOfPlates(0);
    setNumberOfPlates(parseInt(e.target.value));
  }

  function addToCart() {
    if (plate.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      cartStore?.addToCart({
        id: crypto.randomUUID(),
        plate,
        numberOfPlates,
        total:
          plate.reduce((acc, item) => acc + item.price, 0) * numberOfPlates,
      });
      clearPlate();
      setNumberOfPlates(1);
      setLoading(false);
    }, 1500);
  }

  return (
    <div className="grid gap-2 md:gap-4 md:grid-cols-5 leading-tight rounded overflow-hidden">
      <div className="col-span-4 text-center md:text-left space-y-2 md:space-y-0">
        <h2>
          Plate Total: R{plate.reduce((acc, item) => acc + item.price, 0)}
        </h2>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <label htmlFor="number-of-plates">
            How many plates would you like to order?
          </label>
          <input
            type="number"
            min={1}
            id="number-of-plates"
            className="bg-white px-4 py-2 rounded"
            onChange={handleChange}
            defaultValue="1"
          />
        </div>
        <h2 className="col-span-2">
          Total: R
          {plate.reduce((acc, item) => acc + item.price, 0) * numberOfPlates}
        </h2>
      </div>
      {auth?.user ? (
        <Button
          handleClick={addToCart}
          type="success"
          classList="h-min col-span-4 md:col-span-1"
          disabled={loading}
        >
          Add To Cart
        </Button>
      ) : (
        // make this button open a modal to login as not to redirect the user, since they will lose their plate
        <Button
          type="success"
          classList="h-min col-span-4 md:col-span-1 flex items-center justify-center gap-4"
          disabled
        >
          Login to add to cart
        </Button>
      )}
    </div>
  );
}
