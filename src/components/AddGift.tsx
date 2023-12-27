import React, { useState } from "react";

type Props = {
  setGifts: React.Dispatch<React.SetStateAction<string[]>>;
};

const AddGift = ({ setGifts }: Props) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    if (value.trim() !== "") {
      setGifts((prevGifts) => [...prevGifts, value]);
      setValue("");
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
        onChange={handleChange}
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