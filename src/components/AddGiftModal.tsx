import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import AddGift from "./AddGift";
import type { Gift } from "../utils/types";

type Props = {
  isOpen: boolean;
  selectedGift: Gift | null;
  onOpen: () => void;
  onClose: () => void;
  onEditGift: () => void;
};

const AddGiftModal = ({
  isOpen,
  onOpen,
  onClose,
  selectedGift,
  onEditGift,
}: Props) => (
  <Dialog.Root open={isOpen}>
    <Dialog.Trigger asChild>
      <button
        className="bg-red-500 py-2 rounded-xl text-white text-sm w-full"
        onClick={onOpen}
      >
        Agregar regalo
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-slate-900 opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content
        onEscapeKeyDown={onClose}
        className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
      >
        <Dialog.Title className="m-0 text-[17px] font-medium mb-4">
          Agrega un regalo a la lista 🎁 🎁
        </Dialog.Title>
        <AddGift
          onClose={onClose}
          selectedGift={selectedGift}
          onEditGift={onEditGift}
        />
        <Dialog.Close asChild>
          <button
            className="hover:bg-red-500 hover:bg-opacity-70 focus:shadow-lg absolute top-[10px] right-[10px] inline-flex h-[32px] w-[32px] appearance-none items-center justify-center rounded-full focus:outline-none"
            aria-label="Close"
            onClick={() => {
              onEditGift();
              onClose();
            }}
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default AddGiftModal;
