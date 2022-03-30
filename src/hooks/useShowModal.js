import { useRecoilState } from "recoil";
import { modalState, modalActionState } from '../store/modalState';
import { editItemState } from '../store/scheduleState';


export const useShowModal = () => {
  const [show, setShow] = useRecoilState(modalState);
  const [action, setAction] = useRecoilState(modalActionState);
  const [editItem, setEditItem] = useRecoilState(editItemState);

  const showModal = ()=> {
    setShow(!show);
    setAction("add");
  }

  const editCard = (item) => {
    setShow(!show);
    setAction("edit");
    setEditItem(item);
  };
  
  return { showModal, editCard, show, setShow, action, setAction, editItem, setEditItem }
}
