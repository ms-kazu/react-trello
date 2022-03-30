import { useRecoilState } from "recoil";
import UUID from 'uuidjs';
import { FriItemState, MonItemState, SunItemState, ThuItemState, TueItemState, WedItemState, SatItemState } from '../store/scheduleState';
import { patientState } from "../store/patientState";
import { practitionerState } from "../store/practitionerState";
import { selectedWeekState } from "../store/weekState";
import { categoryState } from "../store/categoryState";
import { modalState } from "../store/modalState";

import { useState } from "react";


export const useAddCard = () => {

  const [SunItems, setSunItems] = useRecoilState(SunItemState);
  const [MonItems, setMonItems] = useRecoilState(MonItemState);
  const [TueItems, setTueItems] = useRecoilState(TueItemState);
  const [WedItems, setWedItems] = useRecoilState(WedItemState);
  const [ThuItems, setThuItems] = useRecoilState(ThuItemState);
  const [FriItems, setFriItems] = useRecoilState(FriItemState);
  const [SatItems, setSatItems] = useRecoilState(SatItemState);

  const allItems = {
    "Sun": [SunItems, setSunItems],
    "Mon": [MonItems, setMonItems],
    "Tue": [TueItems, setTueItems],
    "Wed": [WedItems, setWedItems],
    "Thu": [ThuItems, setThuItems],
    "Fri": [FriItems, setFriItems],
    "Sat": [SatItems, setSatItems],
  };

  // const [patient, setPatient] = useRecoilState(patientState);
  // const [practitioner, setPractitioner] = useRecoilState(practitionerState);
  // const [eventStart, setEventStart] = useState();
  // const [eventEnd, setEventEnd] = useState();
  // const [selectedWeek, setSelectedWeek] = useRecoilState(selectedWeekState);
  // const [category, setCategory] = useRecoilState(categoryState);
  const [show, setShow] = useRecoilState(modalState);

  const addCard = (res, selectedWeek) => {
    if(res.type){
      const dayId = res.target.value;
      const newItem ={
        id: UUID.generate(),
        patient: "未設定",
        practitioner: "未設定",
        eventStart: "未設定",
        eventEnd: "未設定",
        category: "未設定",
        dayId: dayId
      }
      const targetColumn = allItems[dayId];
      const newItems = [...targetColumn[0], newItem];
      targetColumn[1](newItems);
    }else{
      const newItem = res;
      const dayId = selectedWeek;
      // const newItem ={
      //   id: UUID.generate(),
      //   patient: patient,
      //   practitioner: practitioner,
      //   eventStart: eventStart,
      //   eventEnd: eventEnd,
      //   category: category,
      //   dayId: dayId
      // }
      const targetColumn = allItems[dayId];
      const newItems = [...targetColumn[0], newItem];
      targetColumn[1](newItems);
      setShow(!show);
    }
  }
  return { addCard }
};