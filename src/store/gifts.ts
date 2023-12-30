import { action } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import type { Gift } from "../utils/types";

export let $gifts = persistentAtom<Gift[] | null>("gifts", null, {
  decode: JSON.parse,
  encode: JSON.stringify,
});

export const addGift = action($gifts, "add gift", (store, gift: Gift) => {
  const prevGifts = store.get();
  if (prevGifts) {
    store.set([...prevGifts, gift]);
  }
});

export const removeGift = action($gifts, "remove gift", (store, id: string) => {
  const prevGifts = store.get();
  if (prevGifts) {
    store.set(prevGifts.filter((item) => item.id !== id));
  }
});

export const removeAllGifts = action($gifts, "remove all gifts", (store) => {
  store.set([]);
});

export const updateGift = action($gifts, "update gift", (store, gift: Gift) => {
  const prevGifts = store.get();
  if (prevGifts) {
    const index = prevGifts.findIndex((item) => item.id === gift.id);
    prevGifts[index] = gift;
    store.set(prevGifts);
  }
});
