import { useStore } from "@nanostores/react";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { $gifts, removeAllGifts, removeGift } from "../store/gifts";
import ModalGift from "./AddGiftModal";
import { useState } from "react";
import type { Gift } from "../utils/types";

// TODO: Resolver hydration errors
const List = () => {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isOpen, setOpen] = useState(false);
  const gifts = useStore($gifts);

  if (gifts === null) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <ModalGift
        isOpen={isOpen}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        selectedGift={selectedGift}
        onEditGift={() => setSelectedGift(null)}
      />
      {gifts.length ? (
        <>
          <ul>
            {gifts.map((gift, index) => (
              <li key={index} className="flex gap-16 justify-between py-1">
                <span className="flex items-center gap-2">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="h-12 w-12 rounded-xl shadow-md object-cover"
                  />
                  <span>
                    <h5>
                      {gift.name} x{gift.quantity}
                    </h5>
                    <p className="text-xs text-slate-700">
                      {gift.to || "Sin destinatario"}
                    </p>
                  </span>
                </span>
                <span className="flex gap-2">
                  <button
                    className="bg-orange-500 px-2 rounded-xl text-white text-xs h-8 w-8"
                    type="button"
                    onClick={() => {
                      setSelectedGift(gift);
                      setOpen(true);
                    }}
                  >
                    <Pencil1Icon />
                  </button>
                  <button
                    className="bg-red-500 px-2 rounded-xl text-white text-xs h-8 w-8"
                    type="button"
                    onClick={() => removeGift(gift.id)}
                  >
                    <TrashIcon />
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <button
            className="bg-slate-400 py-2 rounded-xl text-sm w-full"
            type="button"
            onClick={removeAllGifts}
          >
            Borrar todos
          </button>
        </>
      ) : (
        <p>No hay regalos che, agregá algo!</p>
      )}
    </div>
  );
};

export default List;
