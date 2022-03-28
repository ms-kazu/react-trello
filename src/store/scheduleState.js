import { atom } from "recoil";
import UUID from 'uuidjs';


export const SatItemState = atom({
  key: "SatItemState",
  default: {SatItems: [...Array(4).keys()].map((val) => {
    return{
      id: UUID.generate(),
      patient: `土田_${val}`,
      practitioner: "坂田",
      category: "マッサージ",
      eventStart: "11:00",
      eventEnd: "11:15",
      dayId: "Sat"
    }
  })}
})

export const editItemState = atom({
  key: "editItemState",
  default: null
});