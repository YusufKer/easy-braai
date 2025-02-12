import { PlateItem } from "./PlateBuilder";

type PlateTableProps = {
  plate: PlateItem[];
  handleDelete: (id: string) => void;
};

export default function PlateTable({ plate, handleDelete }: PlateTableProps) {
  return (
    <div className="bg-neutral-200">
      {plate.map((item) => (
        <div key={item.id} className="p-4 grid gap-4 grid-cols-5">
          <div>{item.meat}</div>
          <div>{item.cut}</div>
          <div>{item.flavour}</div>
          <div>R{item.price}</div>
          <button
            onClick={() => handleDelete(item.id)}
            className="bg-red-400 rounded px-4 py-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
