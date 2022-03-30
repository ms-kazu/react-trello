import { useRecoilState } from "recoil";

import { FriItemState, MonItemState, SunItemState, ThuItemState, TueItemState, WedItemState, SatItemState } from '../store/scheduleState';
import { modalState } from "../store/modalState";

export const useEditCard = () => {

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

  const [show, setShow] = useRecoilState(modalState);

  const editCard = (sourceId, selectedWeek, sourceDayId, editItem) => {
    const dayId = selectedWeek;
  
    if (dayId == sourceDayId) {
      try {
        const copiedColumItemState = [...allItems[sourceDayId]];
        const copiedColumItem = [...copiedColumItemState[0]]
        const copiedItemIndex = copiedColumItem.findIndex(({id}) => id === sourceId);
        copiedColumItem.splice(copiedItemIndex, 1)
        copiedColumItem.splice(copiedItemIndex, 0, editItem);
        copiedColumItemState[1](copiedColumItem);
      } catch (error) {
        console.log(error)
      }
    }else{
      try {
        const targetColumnState = allItems[dayId];
        const newItems = [...targetColumnState[0], editItem];
        targetColumnState[1](newItems);
        const sourceColumnState = allItems[sourceDayId];
        const sourceColumnItems = [...sourceColumnState[0]]
        const sourceIndex = sourceColumnItems.findIndex(({id}) => id === sourceId);
        sourceColumnItems.splice(sourceIndex, 1);
        sourceColumnState[1](sourceColumnItems);
      } catch (error) {
        console.log(error)
      }
    }
    setShow(!show);
  }

  return { editCard }
};
