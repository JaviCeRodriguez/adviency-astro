import { persistentAtom } from "@nanostores/persistent";
import type { Gift } from "../utils/types";

export let $gifts = persistentAtom<Gift[]>("gifts", [], {
  decode: JSON.parse,
  encode: JSON.stringify,
});
