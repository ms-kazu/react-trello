import { atom } from "recoil";
import UUID from 'uuidjs';

export const SunItemState = atom({
  key: "SunItemState",
  default: [...Array(3).keys()].map((val) => {
    return{
      id: UUID.generate(),
      patient: `日田_${val}`,
      practitioner: "坂田",
      category: "マッサージ",
      eventStart: "11:00",
      eventEnd: "11:15",
      dayId: "Sun"
    }
  })
});

export const MonItemState = atom({
  key: "MonItemState",
  default: [...Array(3).keys()].map((val) => {
    return{
      id: UUID.generate(),
      patient: `月田_${val}`,
      practitioner: "坂田",
      category: "マッサージ",
      eventStart: "11:00",
      eventEnd: "11:15",
      dayId: "Mon"
    }
  })
})

export const TueItemState = atom({
  key: "TueItemState",
  default: [...Array(3).keys()].map((val) => {
    return{
      id: UUID.generate(),
      patient: `火田_${val}`,
      practitioner: "坂田",
      category: "マッサージ",
      eventStart: "11:00",
      eventEnd: "11:15",
      dayId: "Tue"
    }
  })
})

export const WedItemState = atom({
  key: "WedItemState",
  default: [...Array(3).keys()].map((val) => {
    return{
      id: UUID.generate(),
      patient: `水田_${val}`,
      practitioner: "坂田",
      category: "マッサージ",
      eventStart: "11:00",
      eventEnd: "11:15",
      dayId: "Wed"
    }
  })
})

export const ThuItemState = atom({
  key: "ThuItemState",
  default: [...Array(3).keys()].map((val) => {
    return{
      id: UUID.generate(),
      patient: `木田_${val}`,
      practitioner: "坂田",
      category: "マッサージ",
      eventStart: "11:00",
      eventEnd: "11:15",
      dayId: "Thu"
    }
  })
})

export const FriItemState = atom({
  key: "FriItemState",
  default: [...Array(3).keys()].map((val) => {
    return{
      id: UUID.generate(),
      patient: `金田_${val}`,
      practitioner: "坂田",
      category: "マッサージ",
      eventStart: "11:00",
      eventEnd: "11:15",
      dayId: "Fri",
      writable: true
    }
  })
})

export const SatItemState = atom({
  key: "SatItemState",
  default: [...Array(3).keys()].map((val) => {
    return{
      id: UUID.generate(),
      patient: `土田_${val}`,
      practitioner: "坂田",
      category: "マッサージ",
      eventStart: "11:00",
      eventEnd: "11:15",
      dayId: "Sat",
      writable: true
    }
  })
})

export const editItemState = atom({
  key: "editItemState",
  default: null
});