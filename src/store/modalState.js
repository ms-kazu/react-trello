import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false
})

export const modalActionState = atom({
  key: "modalActionState",
  default: {action: null }
})