import { atom } from "recoil";

export const selectedWeekState = atom({
  key: "selectedWeekState",
  default: {selectedWeek: null }
})