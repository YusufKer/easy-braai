import { PlateItem } from "./PlateBuilder";
import { ChangeEvent, useState } from "react";
import { useCart } from "../../context/cartContext";

type AddPlateToCartProps = {
  plate: PlateItem[];
  clearPlate: () => void;
};

export default function AddPlateToCart({
  plate,
  clearPlate,
}: AddPlateToCartProps) {
  const cartStore = useCart();
  const [numberOfPlates, setNumberOfPlates] = useState(1);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNumberOfPlates(parseInt(e.target.value));
  }

  function addToCart() {
    if (plate.length === 0) return;
    cartStore.addToCart({
      id: crypto.randomUUID(),
      plate,
      numberOfPlates,
      total: plate.reduce((acc, item) => acc + item.price, 0) * numberOfPlates,
    });
    clearPlate();
    setNumberOfPlates(1);
  }

  return (
    <div className="grid gap-4 grid-cols-5 p-4 bg-neutral-50">
      <div className="col-span-4">
        <h2>
          Plate Total: R{plate.reduce((acc, item) => acc + item.price, 0)}
        </h2>
        <div className="flex gap-4">
          <label htmlFor="number-of-plates">
            How many plates would you like to order?
          </label>
          <input
            type="number"
            min={1}
            id="number-of-plates"
            className="bg-white"
            onChange={handleChange}
          />
        </div>
        <h2 className="col-span-2">
          Total: R
          {plate.reduce((acc, item) => acc + item.price, 0) * numberOfPlates}
        </h2>
      </div>
      <button
        onClick={addToCart}
        className="bg-green-400 rounded px-4 py-2 h-min"
      >
        Add To Cart
      </button>
    </div>
  );
}
