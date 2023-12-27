import { useState } from "react";
import AddGift from "./AddGift";

export type Gift = {
  name: string;
  quantity: number;
};

const List = () => {
  const [gifts, setGifts] = useState<Gift[]>([
    { name: "Mate 🧉", quantity: 1 },
    { name: "Chocolates 🍫", quantity: 2 },
    { name: "Alfajores 🍪", quantity: 3 },
  ]);

  const handleDelete = (index: number) => {
    setGifts((prevGifts) => prevGifts.filter((_, i) => i !== index));
  };

  return (
    <div>
      <AddGift gifts={gifts} setGifts={setGifts} />
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
          onClick={() => setGifts([])}
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
