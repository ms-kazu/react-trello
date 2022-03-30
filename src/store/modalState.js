import { atom } from "recoil";
console.log(atom);
export const modalState = atom({
  key: "modalState",
  default: false
})

export const modalActionState = atom({
  key: "modalActionState",
  default: {action: null }
})