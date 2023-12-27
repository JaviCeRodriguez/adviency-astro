import React, { useState } from "react";
import type { Gift } from "./List";

type Props = {
  gifts: Gift[];
  setGifts: React.Dispatch<React.SetStateAction<Gift[]>>;
};

const AddGift = ({ gifts, setGifts }: Props) => {
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleChangeGift = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      setQuantity(parseInt(event.target.value));
    } else {
      setQuantity(1);
    }
  };

  const handleClick = () => {
    if (quantity <= 0) {
      alert("La cantidad debe ser mayor a 0!");
      return;
    }
    if (value.trim() !== "") {
      setGifts((prevGifts) => [...prevGifts, { name: value, quantity }]);
      setValue("");
      setQuantity(1);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        className="border-green-500 border-2 rounded-lg px-1"
        type="text"
        placeholder="Regalo"
        name="gift"
        value={value}
        onChange={handleChangeGift}
        onKeyDown={(event) => event.key === "Enter" && handleClick()}
      />
      <input
        className="border-green-500 border-2 rounded-lg px-1 w-16"
        type="number"
        min={1}
        name="quantity"
        value={quantity}
        onChange={handleChangeQuantity}
        onKeyDown={(event) => event.key === "Enter" && handleClick()}
      />
      <button
        className="bg-red-500 px-1 rounded-lg text-white"
        type="button"
        onClick={handleClick}
      >
        Agregar
      </button>
    </div>
  );
};

export default AddGift;
