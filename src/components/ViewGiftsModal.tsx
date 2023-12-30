import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { formatPrice } from "../utils/helpers";
import { useStore } from "@nanostores/react";
import { $gifts } from "../store/gifts";

// type Props = {
//   isOpen: boolean;
//   onOpen: () => void;
//   onClose: () => void;
// };

// const ViewGiftsModal = ({ isOpen, onOpen, onClose }: Props) => {
const ViewGiftsModal = () => {
  const gifts = useStore($gifts);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="bg-slate-400 py-2 rounded-xl text-sm w-full"
          // onClick={onOpen}
        >
          Previsualizar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900 opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          // onEscapeKeyDown={onClose}
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <Dialog.Title className="m-0 text-4xl mb-4">Comprar:</Dialog.Title>
          <ul className="mb-4">
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
              </li>
            ))}
          </ul>

          <Dialog.Close asChild>
            <button
              className="bg-red-500 px-1 rounded-lg text-white w-full h-10"
              type="button"
              // onClick={onClose}
              aria-label="Close"
            >
              Cerrar
            </button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <button
              className="hover:bg-red-500 hover:bg-opacity-70 focus:shadow-lg absolute top-[10px] right-[10px] inline-flex h-[32px] w-[32px] appearance-none items-center justify-center rounded-full focus:outline-none"
              aria-label="Close"
              // onClick={onClose}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ViewGiftsModal;
