import { useEffect, useState } from "react";
import AddGift from "./AddGift";
import type { Gift } from "../utils/types";
import { saveToLS } from "../store/localStorage";

type Props = {
  savedGifts: Gift[] | null;
};

const List = ({ savedGifts }: Props) => {
  const [gifts, setGifts] = useState<Gift[]>(savedGifts || []);

  const handleDelete = (index: number) => {
    setGifts((prevGifts) => prevGifts.filter((_, i) => i !== index));
  };

  useEffect(() => {
    saveToLS(gifts);
  }, [gifts]);

  return (
    <div>
      <AddGift setGifts={setGifts} />
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
