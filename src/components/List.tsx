import { useStore } from "@nanostores/react";
import { TrashIcon, Pencil1Icon, CopyIcon } from "@radix-ui/react-icons";
import { $gifts, removeAllGifts, removeGift } from "../store/gifts";
import ModalGift from "./AddGiftModal";
import { useState } from "react";
import type { Gift, Modes } from "../utils/types";
import { formatPrice, getTotalPriceARS } from "../utils/helpers";
import ViewGiftsModal from "./ViewGiftsModal";

// TODO: Resolver hydration errors
const List = () => {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [mode, setMode] = useState<Modes>("add");
  const [isOpen, setOpen] = useState(false);
  const gifts = useStore($gifts);

  return (
    <div className="flex flex-col gap-2">
      <ModalGift
        mode={mode}
        isOpen={isOpen}
        onOpen={() => {
          setMode("add");
          setOpen(true);
        }}
        onClose={() => setOpen(false)}
        selectedGift={selectedGift}
        onEditGift={() => setSelectedGift(null)}
      />
      {gifts?.length ? (
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
                      {gift.name} (x{gift.quantity}) -&nbsp;
                      {formatPrice(parseFloat(gift.price))}
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
                      setMode("edit");
                      setSelectedGift(gift);
                      setOpen(true);
                    }}
                  >
                    <Pencil1Icon />
                  </button>
                  <button
                    className="bg-yellow-500 px-2 rounded-xl text-white text-xs h-8 w-8"
                    type="button"
                    onClick={() => {
                      setMode("duplicate");
                      setSelectedGift(gift);
                      setOpen(true);
                    }}
                  >
                    <CopyIcon />
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
          <hr />
          <h4 className="text-center text-sm font-semibold">
            Total: {getTotalPriceARS(gifts)}
          </h4>
          <button
            className="bg-slate-400 py-2 rounded-xl text-sm w-full"
            type="button"
            onClick={removeAllGifts}
          >
            Borrar todos
          </button>
          <ViewGiftsModal />
        </>
      ) : (
        <p>No hay regalos che, agregá algo!</p>
      )}
    </div>
  );
};

export default List;
