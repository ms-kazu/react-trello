import {DragDropContext} from 'react-beautiful-dnd';
import styled from "styled-components";
import UUID from 'uuidjs';
import React, {useState} from 'react';

import { DragDropArea } from './components/DragDropArea'
import { Addbutton } from './components/AddButton';
import { Modal } from './components/Modal';
import { useRecoilState } from 'recoil';
import { modalState, modalActionState } from './store/modalState';
import { editItemState } from './store/scheduleState';

const week = [
  {
    "dow": "日曜日",
    "dayId": "Sun",
    "color": "#f0f8ff"
  },
  {
    "dow": "月曜日",
    "dayId": "Mon",
    "color": "#66cdaa"
  },
  {
    "dow": "火曜日",
    "dayId": "Tue",
    "color": "#fffacd"
  },
  {
    "dow": "水曜日",
    "dayId": "Wed",
    "color": "#e6cde3"
  },
  {
    "dow": "木曜日",
    "dayId": "Thu",
    "color": "#c1c1ff"
  },
  {
    "dow": "金曜日",
    "dayId": "Fri",
    "color": "#ffcccc"
  },
  {
    "dow": "土曜日",
    "dayId": "Sat",
    "color": "#b2ffff"
  },
];

export const Torello = () =>{
  console.log("sass");
  const [SunItems, setSunItems] = useState(
    [...Array(3).keys()].map((val) => {
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
  );

  const [MonItems, setMonItems] = useState(
    [...Array(3).keys()].map((val) => {
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
  );

  const [TueItems, setTueItems] = useState(
    [...Array(3).keys()].map((val) => {
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
  );

  const [WedItems, setWedItems] = useState(
    [...Array(3).keys()].map((val) => {
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
  );

  const [ThuItems, setThuItems] = useState(
    [...Array(3).keys()].map((val) => {
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
  );

  const [FriItems, setFriItems] = useState(
    [...Array(3).keys()].map((val) => {
      return{
        id: UUID.generate(),
        patient: `金田_${val}`,
        practitioner: "坂田",
        category: "マッサージ",
        eventStart: "11:00",
        eventEnd: "11:15",
        dayId: "Fri"
      }
    })
  );

  const [SatItems, setSatItems] = useState(
    [...Array(3).keys()].map((val) => {
      return{
        id: UUID.generate(),
        patient: `土田_${val}`,
        practitioner: "坂田",
        category: "マッサージ",
        eventStart: "11:00",
        eventEnd: "11:15",
        dayId: "Sat"
      }
    })
  );

  
  // const [SatItems, setSatItems] = useRecoilState(SatItemState);
  
  const allItems = {
    "Sun": [SunItems, setSunItems],
    "Mon": [MonItems, setMonItems],
    "Tue": [TueItems, setTueItems],
    "Wed": [WedItems, setWedItems],
    "Thu": [ThuItems, setThuItems],
    "Fri": [FriItems, setFriItems],
    "Sat": [SatItems, setSatItems],
  };

  const onDragEnd = (result) => {
    const {source, destination} = result;
    if(!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = [...allItems[`${source.droppableId}`]];
      const destinationColumn  = [...allItems[`${destination.droppableId}`]];
      const remove = sourceColumn[0].splice(source.index, 1);
      console.log(destination.droppableId);
      remove[0].dayId = destination.droppableId;
      destinationColumn[0].splice(destination.index, 0, remove[0]);
      sourceColumn[1](sourceColumn[0]);
      destinationColumn[1](destinationColumn[0]);
    } else {
      const resDayId = source.droppableId;
      const copiedColumItems = [...allItems[`${resDayId}`]]
      const remove = copiedColumItems[0].splice(source.index, 1);
      copiedColumItems[0].splice(destination.index, 0, remove[0]);
      copiedColumItems[1](copiedColumItems[0]);
    }
  };

  const onClickAddCard = (e) => {
    const dayId = e.target.value;
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
  };

  const [show, setShow] = useRecoilState(modalState);
  const [action, setAction] = useRecoilState(modalActionState);
  const [editItem, setEditItem] = useRecoilState(editItemState);

  const onClickAddModal = () => {
    setShow(!show);
    setAction("add");
  }

  const SKanbanBoard = styled.div`
    height: 100vh;
  `;

  const SDragDropWrapper = styled.div`
    display: flex;
  `;

  const SAreaTitle = styled.h2`
    color: #344168;
    margin-bottom: 2px;
  `

  const STitle = styled.h1`
    color: #344168;
    margin-left: 20px;
    margin-bottom: 10px;
  `

  const SbuttonWrapper = styled.div`
    text-align: right;
    margin: 5px;
    margin-bottom: 5px;
  `
  const SCardWrapper = styled.div`
    width: 14%;
    margin: 0 auto;
    text-align: center;
    flex-direction: column;
    align-items: center;
  `

  const SAddbuttonWrapper = styled.div`
    text-align: right;
  `

  const SAddModalButton = styled.button`
    width:  100px;
    border-radius: 100px;
    border: 2px solid #37B0BE;
    background-color: #fff;
    color: #37B0BE;
    font-weight: bold;
    font-size: 16px;
    height: 40px;
    margin-right: 10px;
    :hover{
      background-color: #37B0BE;
      color: #fff;
      border: 2px solid #37B0BE;
      cursor: pointer;
    }
  `

  const SHeader = styled.header`
    height: 40px;
    background-color: #344168;
    line-height: 40px;
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    padding-left: 10px;
  `

  return (
    <>
      <SHeader>MS Torello</SHeader>
      <STitle><i class="far fa-calendar-alt fa-fw"></i>デフォルトスケジュール</STitle>
      <SKanbanBoard>
        <SAddbuttonWrapper><SAddModalButton onClick={onClickAddModal}>登録</SAddModalButton></SAddbuttonWrapper>
        <Modal allItems = {allItems} editItem={editItem}></Modal>
        <SDragDropWrapper>
            <DragDropContext onDragEnd={onDragEnd}>
              {week.map((val) => {
                return(
                <SCardWrapper>
                  <SAreaTitle>{val.dow}</SAreaTitle> 
                  <SbuttonWrapper>
                    <Addbutton 
                    val={val} 
                    onClickAddCard={onClickAddCard}>
                    </Addbutton>
                  </SbuttonWrapper>
                  <DragDropArea val={val} allItems={allItems}></DragDropArea>
                </SCardWrapper>
              )})}
            </DragDropContext>
        </SDragDropWrapper>
      </SKanbanBoard>
    </>
  );
}