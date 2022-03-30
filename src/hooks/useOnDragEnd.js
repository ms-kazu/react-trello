import { useRecoilState } from "recoil";
import {FriItemState, MonItemState, SunItemState, ThuItemState, TueItemState, WedItemState, SatItemState } from '../store/scheduleState';

export const useOnDragEnd = () => {

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

  const dragDropItem = (result) => {
    const {source, destination} = result;
    if(!destination) return;
    if (source.droppableId !== destination.droppableId) {
      try{
        const sourceColumn = [...allItems[`${source.droppableId}`]];
        const sourceWeekItems = [...sourceColumn[0]];
        const destinationColumn  = [...allItems[`${destination.droppableId}`]];
        const destinationWeekItems  = [...destinationColumn[0]];
        const remove = sourceWeekItems.splice(source.index, 1);
        const removeItem = {...remove[0]}
        removeItem.dayId = destination.droppableId;
        console.log(removeItem);
        destinationWeekItems.splice(destination.index, 0, removeItem);
        sourceColumn[1](sourceWeekItems);
        destinationColumn[1](destinationWeekItems);
      }catch(e){
        console.log(e)
      }
    } else {
      const resDayId = source.droppableId;
      const copiedColumItems = [...allItems[`${resDayId}`]]
      const copiedWeekItems = [...copiedColumItems[0]]
      const remove = copiedWeekItems.splice(source.index, 1);
      copiedWeekItems.splice(destination.index, 0, remove[0]);
      copiedColumItems[1](copiedWeekItems);
    }
  };

  return { dragDropItem }
};