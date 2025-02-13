import { ChangeEvent, useState, useRef } from "react";
import { PlateItem } from "./PlateBuilder";

type AddToPlateProps = {
  addToPlate: (plateItem: PlateItem) => void;
};

export default function AddToPlate({ addToPlate }: AddToPlateProps) {
  const [selectedMeat, setSelectedMeat] = useState<Meat>(meats[0] as Meat);
  const cutRef = useRef<HTMLSelectElement>(null);
  const flavourRef = useRef<HTMLSelectElement>(null);

  function handleChangeMeat(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedMeat(e.target?.value as Meat);
  }

  function handleClick() {
    const cutPrice = meatOptions[selectedMeat].cuts.find(
      (cut) => cut.name === cutRef.current?.value
    )?.price;
    const flavourPrice = meatOptions[selectedMeat].flavours.find(
      (flavour) => flavour.name === flavourRef.current?.value
    )?.price;

    const meat: PlateItem = {
      id: crypto.randomUUID(),
      meat: selectedMeat,
      cut: cutRef.current?.value as string,
      flavour: flavourRef.current?.value as string,
      price: (cutPrice as number) + (flavourPrice as number),
    };

    addToPlate({ ...meat });
  }

  return (
    <div className="bg-neutral-50">
      <div className="grid gap-2 md:gap-4 md:grid-cols-5 p-4 items-center">
        <select onChange={handleChangeMeat} className="w-full">
          {meats.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <select ref={cutRef} className="w-full">
          {meatOptions[selectedMeat].cuts.map((cut) => (
            <option value={cut.name} key={cut.name}>
              {cut.name} (R{cut.price})
            </option>
          ))}
        </select>
        <select ref={flavourRef} className="w-full">
          {meatOptions[selectedMeat].flavours.map((flavour) => (
            <option value={flavour.name} key={flavour.name}>
              {flavour.name} (R{flavour.price})
            </option>
          ))}
        </select>
        <div></div>
        <button className="bg-blue-400 rounded px-4 py-2" onClick={handleClick}>
          Add to plate
        </button>
      </div>
    </div>
  );
}

const meats = ["chicken", "beef", "lamb", "sausage"];

type Meat = "chicken" | "beef" | "lamb" | "sausage";

type MeatOptions = {
  [key in Meat]: {
    cuts: {
      name: string;
      price: number;
    }[];
    flavours: {
      name: string;
      price: number;
    }[];
  };
};

const meatOptions: MeatOptions = {
  chicken: {
    cuts: [
      {
        name: "leg",
        price: 10,
      },
      {
        name: "thigh",
        price: 10,
      },
      {
        name: "wing",
        price: 10,
      },
      {
        name: "breast",
        price: 10,
      },
      {
        name: "breast quarter",
        price: 10,
      },
      {
        name: "leg quarter",
        price: 10,
      },
    ],
    flavours: [
      {
        name: "Peri Peri",
        price: 5,
      },
      {
        name: "Lemon and Herb",
        price: 5,
      },
      {
        name: "Portugese",
        price: 5,
      },
    ],
  },
  beef: {
    cuts: [
      {
        name: "fillet",
        price: 10,
      },
      {
        name: "rump",
        price: 10,
      },
      {
        name: "sirloin",
        price: 10,
      },
    ],
    flavours: [
      {
        name: "Pepper",
        price: 5,
      },
      {
        name: "Sweet and Sour",
        price: 5,
      },
      {
        name: "Mexican",
        price: 5,
      },
    ],
  },
  lamb: {
    cuts: [
      {
        name: "shank",
        price: 10,
      },
      {
        name: "loin chop",
        price: 10,
      },
    ],
    flavours: [
      {
        name: "Pepper",
        price: 5,
      },
      {
        name: "Sweet and Sour",
        price: 5,
      },
      {
        name: "Mexican",
        price: 5,
      },
    ],
  },
  sausage: {
    cuts: [
      {
        name: "10cm",
        price: 10,
      },
      {
        name: "15cm",
        price: 15,
      },
      {
        name: "20cm",
        price: 20,
      },
    ],
    flavours: [
      {
        name: "Dhanya",
        price: 5,
      },
      {
        name: "Chilli",
        price: 5,
      },
      {
        name: "Asian",
        price: 5,
      },
    ],
  },
};
