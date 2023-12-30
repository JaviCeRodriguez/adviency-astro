import React, { useState } from "react";
import { $gifts } from "../store/gifts";
import type { Gift } from "../utils/types";
import { DialogClose } from "@radix-ui/react-dialog";

const defaultGift = {
  image: "",
  name: "",
  quantity: 1,
};

const AddGift = () => {
  const [gift, setGift] = useState<Gift>(defaultGift);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGift({ ...gift, [name]: value });
  };

  const handleClick = () => {
    // TODO: Change alerts by a modal or something else
    if (gift.quantity <= 0) {
      alert("La cantidad debe ser mayor a 0!");
      return;
    }

    if (gift.image.trim() === "") {
      alert("La imagen no puede estar vacía!");
      return;
    }

    if (gift.name.trim() === "") {
      alert("El nombre no puede estar vacío!");
      return;
    }

    $gifts.set([...$gifts.get(), gift]);
    setGift(defaultGift);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className="border-green-500 border-2 rounded-lg px-1"
        type="text"
        placeholder="http://image..."
        name="image"
        value={gift.image}
        onChange={handleChange}
        onKeyDown={(event) => event.key === "Enter" && handleClick()}
      />
      <input
        className="border-green-500 border-2 rounded-lg px-1"
        type="text"
        placeholder="Regalo"
        name="name"
        value={gift.name}
        onChange={handleChange}
        onKeyDown={(event) => event.key === "Enter" && handleClick()}
      />
      <div className="flex gap-2">
        <input
          className="border-green-500 border-2 rounded-lg px-1 w-24 text-center"
          type="number"
          min={1}
          name="quantity"
          value={gift.quantity}
          onChange={handleChange}
          onKeyDown={(event) => event.key === "Enter" && handleClick()}
        />
        <DialogClose asChild>
          <button
            className="bg-red-500 px-1 rounded-lg text-white w-full"
            type="button"
            onClick={handleClick}
            aria-label="Close"
          >
            Agregar
          </button>
        </DialogClose>
      </div>
    </div>
  );
};

export default AddGift;
