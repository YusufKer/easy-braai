import Button from "../Button";
import { PlateItem } from "./PlateBuilder";

type PlateTableProps = {
  plate: PlateItem[];
  handleDelete: (id: string) => void;
};

export default function PlateTable({ plate, handleDelete }: PlateTableProps) {
  return (
    <div className="bg-neutral-100 rounded overflow-hidden">
      {plate.map((item) => (
        <div
          key={item.id}
          className="px-4 py-2 grid gap-2 md:gap-4 grid-cols-[1fr_auto] even:bg-neutral-50 items-center"
        >
          <div>
            {item.meat} ({item.cut}) ({item.flavour}) R{item.price}
          </div>
          <Button type="danger" round handleClick={() => handleDelete(item.id)}>
            <i className="fa-solid fa-trash text-xs"></i>
          </Button>
        </div>
      ))}
    </div>
  );
}
