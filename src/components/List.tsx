import AddGift from "./AddGift";
import { $gifts } from "../store/gifts";
import { useStore } from "@nanostores/react";

const List = () => {
  const gifts = useStore($gifts);
  const handleDelete = (index: number) => {
    $gifts.set($gifts.get().filter((_, i) => i !== index));
  };

  return (
    <div>
      <AddGift />
      <ul>
        {gifts.map((gift, index) => (
          <li key={index} className="flex gap-4 justify-between py-1">
            {gift.name} x{gift.quantity}
            <button
              className="bg-red-500 px-2 rounded-xl text-white text-xs"
              type="button"
              onClick={() => handleDelete(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {gifts.length ? (
        <button
          className="bg-red-500 mt-2 py-2 rounded-xl text-white text-sm w-full"
          type="button"
          onClick={() => $gifts.set([])}
        >
          Borrar todos
        </button>
      ) : (
        <p className="mt-2">No hay regalos che, agregá algo!</p>
      )}
    </div>
  );
};

export default List;
