import type { Gift } from "../utils/types";

export const saveToLS = async (state: Gift[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("gifts", serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const loadFromLS = async () => {
  try {
    const serializedState = localStorage.getItem("gifts");
    if (serializedState === null) return null;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return null;
  }
};
