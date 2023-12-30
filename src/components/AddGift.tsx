import React, { useState } from "react";
import { $gifts } from "../store/gifts";
import type { Gift } from "../utils/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { v4 as uuidv4 } from "uuid";

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
    }
  );

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
      $gifts.set($gifts.get().map((g) => (g.id === gift.id ? gift : g)));
    } else {
      $gifts.set([...$gifts.get(), gift]);
    }

    setGift({
      id: uuidv4(),
      image: "",
      name: "",
      to: "",
      quantity: 1,
    });
    onEditGift();
    onClose();
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
      <input
        className="border-green-500 border-2 rounded-lg px-1"
        type="text"
        placeholder="Destinatario"
        name="to"
        value={gift.to}
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
            {selectedGift ? "Editar" : "Agregar"}
          </button>
        </DialogClose>
      </div>
    </div>
  );
};

export default AddGift;
