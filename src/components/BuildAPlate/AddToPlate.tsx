import { ChangeEvent, useState, useRef } from "react";
import { PlateItem } from "./PlateBuilder";
import Button from "../Button";
import { Meat, useMeatStore } from "../../context/meatStore";

type AddToPlateProps = {
  addToPlate: (plateItem: PlateItem) => void;
};

export default function AddToPlate({ addToPlate }: AddToPlateProps) {
  const meatStore = useMeatStore();
  const [selectedMeat, setSelectedMeat] = useState<Meat>("beef");

  const cutRef = useRef<HTMLSelectElement>(null);
  const flavourRef = useRef<HTMLSelectElement>(null);

  function handleChangeMeat(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedMeat(e.target?.value as Meat);
  }

  function handleClick() {
    if (!meatStore?.meatOptions?.[selectedMeat as Meat]) return;
    const cutPrice = meatStore?.meatOptions[selectedMeat as Meat]?.cuts.find(
      (cut) => cut.name === cutRef.current?.value
    )?.price;
    const flavourPrice = meatStore?.meatOptions[
      selectedMeat as Meat
    ]?.flavours.find(
      (flavour) => flavour.name === flavourRef.current?.value
    )?.price;

    if (!cutPrice || !flavourPrice) return;

    const flavourID = flavourRef.current?.options
      ? Array.from(flavourRef.current.options).find((option) => option.selected)
          ?.dataset.id
      : undefined;

    const cutID = cutRef.current?.options
      ? Array.from(cutRef.current.options).find((option) => option.selected)
          ?.dataset.id
      : undefined;

    const meat: PlateItem = {
      id: crypto.randomUUID(),
      meat: selectedMeat as string,
      cut: cutRef.current?.value as string,
      cutID: cutID as string,
      flavour: flavourRef.current?.value as string,
      flavourID: flavourID as string,
      // @ts-expect-error
      price: parseInt(cutPrice) + parseInt(flavourPrice),
    };

    addToPlate({ ...meat });
  }

  if (meatStore?.loading) {
    return <div>Loading...</div>;
  } else {
    return (
      // Todo... move this to be global state that only loads once for the app
      <div className="grid gap-2 md:gap-4 md:grid-cols-5 items-center">
        <select
          onChange={handleChangeMeat}
          className="w-full px-4 py-2 rounded bg-white"
        >
          {meatStore?.meats?.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <select ref={cutRef} className="w-full px-4 py-2 rounded bg-white">
          {meatStore?.meatOptions?.[selectedMeat as Meat]?.cuts.map((cut) => (
            <option value={cut.name} key={cut.name} data-id={cut.id}>
              {cut.name} (R{cut.price})
            </option>
          ))}
        </select>
        <select ref={flavourRef} className="w-full px-4 py-2 rounded bg-white">
          {meatStore?.meatOptions?.[selectedMeat as Meat]?.flavours.map(
            (flavour) => (
              <option
                value={flavour.name}
                key={flavour.name}
                data-id={flavour.id}
              >
                {flavour.name} (R{flavour.price})
              </option>
            )
          )}
        </select>
        <div></div>
        <Button type="info" handleClick={handleClick}>
          Add to plate
        </Button>
      </div>
    );
  }
}
