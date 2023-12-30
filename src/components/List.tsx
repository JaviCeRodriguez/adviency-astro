import { $gifts } from "../store/gifts";
import { useStore } from "@nanostores/react";
import ModalGift from "./AddGiftModal";

// TODO: Resolver hydration errors
const List = () => {
  const gifts = useStore($gifts);
  const handleDelete = (index: number) => {
    $gifts.set($gifts.get().filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <ModalGift />
      {gifts.length ? (
        <>
          <ul>
            {gifts.map((gift, index) => (
              <li key={index} className="flex gap-4 justify-between py-1">
                <div className="flex items-center gap-2">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="h-8 w-8 rounded-xl shadow-md object-cover"
                  />
                  {gift.name} x{gift.quantity}
                </div>
                <button
                  className="bg-red-500 px-2 rounded-xl text-white text-xs h-8 w-8"
                  type="button"
                  onClick={() => handleDelete(index)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <button
            className="bg-slate-400 py-2 rounded-xl text-sm w-full"
            type="button"
            onClick={() => $gifts.set([])}
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
