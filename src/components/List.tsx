import { useState } from "react";
import AddGift from "./AddGift";

const List = () => {
  const [gifts, setGifts] = useState<string[]>([
    "Mate 🧉",
    "Chocolates 🍫",
    "Alfajores 🍪",
  ]);

  const handleDelete = (index: number) => {
    setGifts((prevGifts) => prevGifts.filter((_, i) => i !== index));
  };

  return (
    <div>
      <AddGift setGifts={setGifts} />
      <ul>
        {gifts.map((gift, index) => (
          <li key={index} className="flex gap-4 justify-between py-1">
            {gift}
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
    </div>
  );
};

export default List;
