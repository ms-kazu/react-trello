import { atom } from "recoil";

export const patientState = atom({
  key: "patientState",
  default: {patient: null}
})