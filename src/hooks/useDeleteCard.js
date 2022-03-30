import { useRecoilState } from "recoil";

export const useDeleteCard = () =>{

  const deleteCard = (schedules, setSchedules, item) => {
    const result = window.confirm("削除しますか？");
    if (result) {
      const resId = item.id;
      const targetIndex = schedules.findIndex(({id}) => id === resId);
      const newSchedules = [...schedules];
      newSchedules.splice(targetIndex, 1);
      setSchedules(newSchedules)
    }else{
      return
    }
  }
  return { deleteCard }
}