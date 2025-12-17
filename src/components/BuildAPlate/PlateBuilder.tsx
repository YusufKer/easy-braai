import { useState } from "react";
import AddToPlate from "@/components/BuildAPlate/AddToPlate.tsx";
import PlateTable from "@/components/BuildAPlate/PlateTable.tsx";
import AddPlateToCart from "@/components/BuildAPlate/AddPlateToCart.tsx";

export type PlateItem = {
  id: string;
  meatID: string;
  meat: string;
  cutID: string;
  cut: string;
  flavourID: string;
  flavour: string;
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
