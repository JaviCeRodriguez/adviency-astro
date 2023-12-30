export type Gift = {
  id: string;
  image: string;
  name: string;
  to: string;
  quantity: number;
  price: string;
};

export type Modes = "add" | "edit" | "duplicate";
