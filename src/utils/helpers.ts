import type { Gift } from "./types";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);
};

export const getTotalPriceARS = (gifts: Gift[]) => {
  const total = gifts.reduce((acc, gift) => acc + parseFloat(gift.price), 0);
  return formatPrice(total);
};
