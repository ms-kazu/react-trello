import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from "styled-components";
import UUID from 'uuidjs';

import "./styles.css";


import { DragDropArea } from './DragDropArea'
import { Addbutton } from './AddButton';
import { Modal } from './Modal';

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



const App = () => {
  const [SunItems, setSunItems] = useState(
    [...Array(4).keys()].map((val) => {
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
    [...Array(4).keys()].map((val) => {
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
    [...Array(4).keys()].map((val) => {
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
    [...Array(4).keys()].map((val) => {
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
    [...Array(4).keys()].map((val) => {
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
    [...Array(4).keys()].map((val) => {
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
    [...Array(4).keys()].map((val) => {
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

  let item = {
    id: 0,
    patient: "",
    category: "はりきゅう",
    eventStart: "11:00",
    eventEnd: "11:15",
    dayId: 0
  };

  const onClickAddCard = (e) => {
    let dayId = e.target.value;
    let length;
    let newItems;

    console.log(dayId);

    item.dayId = dayId;

    switch (dayId) {
      case "Sun":
        length = SunItems.length;
        item.id = SunItems.length;
        item.text = `斉藤_${length}`
        newItems = [...SunItems, item]
        setSunItems(newItems);

        break;
      case "Mon":
        length = MonItems.length;
        item.id = MonItems.length;
        item.text = `斉藤_${length}`
        newItems = [...MonItems, item]
        setMonItems(newItems);

        break;
      case "Tue":
        length = TueItems.length;
        item.id = TueItems.length;
        item.text = `斉藤_${length}`
        newItems = [...TueItems, item]
        setTueItems(newItems);

        break;
      case "Wed":
        length = WedItems.length;
        item.id = WedItems.length;
        item.text = `斉藤_${length}`
        newItems = [...WedItems, item]
        setWedItems(newItems);

        break;
      case "Thu":
        length = ThuItems.length;
        item.id = ThuItems.length;
        item.text = `斉藤_${length}`
        newItems = [...ThuItems, item]
        setThuItems(newItems);

        break;
      case "Fri":
        length = FriItems.length;
        item.id = FriItems.length;
        item.text = `斉藤_${length}`
        newItems = [...FriItems, item]
        setFriItems(newItems);

        break;
      case "Sat":
        item.id = SatItems.length;
        item.text = `斉藤_${length}`
        length = SatItems.length;
        newItems = [...SatItems, item]
        setSatItems(newItems);
        
        break;
    }
  };

  const [show, setShow] = useState(false)

  const onClickAddModal = () => {
    setShow(!show)
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

  return (
    <>
      <STitle><i class="far fa-calendar-alt fa-fw"></i>デフォルトスケジュール</STitle>
      <SKanbanBoard>
        <SAddbuttonWrapper><SAddModalButton onClick={onClickAddModal}>登録</SAddModalButton></SAddbuttonWrapper>
        <Modal show = {show} setShow = {setShow} allItems = {allItems} ></Modal>
        <SDragDropWrapper  >
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


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);