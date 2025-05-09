import { useState } from "react";
import AddToPlate from "./AddToPlate.tsx";
import PlateTable from "./PlateTable.tsx";
import AddPlateToCart from "./AddPlateToCart.tsx";

export type PlateItem = {
  id: string;
  meat: string;
  cut: string;
  cutID: string;
  flavour: string;
  flavourID: string;
  price: number;
};

export default function PlateBuilder() {
  const [plate, setPlate] = useState<PlateItem[]>([]);

  function addToPlate(plateItem: PlateItem) {
    setPlate((prevPlate) => [...prevPlate, plateItem]);
  }

  function handleDelete(id: string) {
    setPlate((prevPlate) => prevPlate.filter((item) => item.id !== id));
  }

  function clearPlate() {
    setPlate([]);
  }

  return (
    <>
      <PlateTable plate={plate} handleDelete={handleDelete} />
      <AddToPlate addToPlate={addToPlate} />
      <AddPlateToCart plate={plate} clearPlate={clearPlate} />
    </>
  );
}
