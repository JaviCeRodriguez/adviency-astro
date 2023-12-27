import { useState } from "react";
import AddGift from "./AddGift";

const List = () => {
  const [gifts, setGifts] = useState<string[]>([
    "Mate 🧉",
    "Chocolates 🍫",
    "Alfajores 🍪",
  ]);

  return (
    <div>
      <AddGift setGifts={setGifts} />
      <ul>
        {gifts.map((gift, index) => (
          <li key={index}>{gift}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
