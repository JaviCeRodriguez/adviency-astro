import React, { useState } from "react";
import { addGift, updateGift } from "../store/gifts";
import type { Gift } from "../utils/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { v4 as uuidv4 } from "uuid";
import { giftsSuggestions } from "../utils/suggestions";

type Props = {
  selectedGift: Gift | null;
  onClose: () => void;
  onEditGift: () => void;
};

const AddGift = ({ selectedGift, onClose, onEditGift }: Props) => {
  const [gift, setGift] = useState<Gift>(
    selectedGift ?? {
      id: uuidv4(),
      image: "",
      name: "",
      to: "",
      quantity: 1,
      price: 0,
    }
  );

  const surpiseMe = () => {
    const giftName =
      giftsSuggestions[Math.floor(Math.random() * giftsSuggestions.length)];
    setGift({ ...gift, name: giftName });
  };

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

    if (gift.to.trim() === "") {
      alert("El destinatario no puede estar vacío!");
      return;
    }

    if (gift.name.trim() === "") {
      alert("El nombre no puede estar vacío!");
      return;
    }

    if (selectedGift) {
      updateGift(gift);
    } else {
      addGift(gift);
    }

    setGift({
      id: uuidv4(),
      image: "",
      name: "",
      to: "",
      quantity: 1,
      price: 0,
    });
    onEditGift();
    onClose();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          className="border-green-500 border-2 rounded-lg px-1 w-full"
          type="text"
          placeholder="Regalo"
          name="name"
          value={gift.name}
          onChange={handleChange}
          onKeyDown={(event) => event.key === "Enter" && handleClick()}
        />
        <button
          className="bg-green-500 px-1 text-sm rounded-lg text-white w-56"
          onClick={surpiseMe}
        >
          Sorpendeme! 🎁
        </button>
      </div>
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
        placeholder="Destinatario"
        name="to"
        value={gift.to}
        onChange={handleChange}
        onKeyDown={(event) => event.key === "Enter" && handleClick()}
      />
      <div className="flex justify-between gap-2">
        <input
          className="border-green-500 border-2 rounded-lg px-1 w-2/5 text-center"
          type="number"
          min={1}
          name="quantity"
          value={gift.quantity}
          onChange={handleChange}
          onKeyDown={(event) => event.key === "Enter" && handleClick()}
        />
        <label className="w-2/5 flex gap-1 items-center">
          <input
            className="border-green-500 border-2 rounded-lg px-1 text-right w-full"
            type="number"
            min={0}
            name="price"
            value={gift.price}
            onChange={handleChange}
            onKeyDown={(event) => event.key === "Enter" && handleClick()}
          />
          <span className="text-md text-gray-500">$</span>
        </label>
      </div>
      <DialogClose asChild>
        <button
          className="bg-red-500 px-1 rounded-lg text-white w-full h-10"
          type="button"
          onClick={handleClick}
          aria-label="Close"
        >
          {selectedGift ? "Editar" : "Agregar"}
        </button>
      </DialogClose>
    </div>
  );
};

export default AddGift;
