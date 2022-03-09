import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import styled from "styled-components";
import UUID from 'uuidjs';

import { Schedules } from './Schedules';

import "./styles.css";

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
        text: `日田_${val}`,
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
        text: `月田_${val}`,
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
        text: `火田_${val}`,
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
        text: `水田_${val}`,
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
        text: `木田_${val}`,
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
        text: `金田_${val}`,
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
        text: `土田_${val}`,
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
      console.log("ss");
      const sourceColumn = [...allItems[`${source.droppableId}`]];
      const destinationColumn  = [...allItems[`${destination.droppableId}`]];
      const remove = sourceColumn[0].splice(source.index, 1);
      destinationColumn[0].splice(destination.index, 0, remove[0]);
      sourceColumn[1](sourceColumn[0]);
      destinationColumn[1](destinationColumn[0]);
    } else {
      console.log("bb");
      const resDayId = source.droppableId;
      const copiedColumItems = [...allItems[`${resDayId}`]]
      const remove = copiedColumItems[0].splice(source.index, 1);
      copiedColumItems[0].splice(destination.index, 0, remove[0]);
      copiedColumItems[1](copiedColumItems[0]);
    }
  };

  let item = {
    id: 0,
    text: "",
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

  const SKanbanBoard = styled.div`
    height: 90vh;
  `;

  const SDragDropArea = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 5px;
    margin: 3px;
    text-align: center;
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
    margin-left: 10px;
  `

  const SAddbutton = styled.button`
    border: 1px solid #55B1DF;
    font-weight: bold;
    border-radius: 5px;
    background-color: #55B1DF;
    color: #fff;
    :hover{
      background-color: #fff;
      color: #55B1DF;
      border: 1px solid #55B1DF;
      cursor: pointer;
    }
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
    flex-direction: colums;
    align-items: center;
  `

  return (
    <>
      <STitle>■デフォルトスケジュール</STitle>
      <SKanbanBoard>
        <SDragDropWrapper  >
            <DragDropContext onDragEnd={onDragEnd}>
              {week.map((val) => {
                return(
                <SCardWrapper>
                <SAreaTitle>{val.dow}</SAreaTitle> 
                <SbuttonWrapper>
                  <SAddbutton value={val.dayId} onClick={onClickAddCard}>＋</SAddbutton>
                </SbuttonWrapper>
                    <Droppable droppableId={val.dayId} key={val.dayId}>
                      {(provided, snapshot) => (
                        <SDragDropArea 
                          {...provided.droppableProps} 
                          ref={provided.innerRef} 
                          style={{ 
                            backgroundColor: snapshot.isDraggingOver ? val.color : '',
                          }}
                        >
                          {val.dayId == "Sun" && <Schedules schedules={SunItems}></Schedules>}
                          {val.dayId == "Mon" && <Schedules schedules={MonItems}></Schedules>}
                          {val.dayId == "Tue" && <Schedules schedules={TueItems}></Schedules>}
                          {val.dayId == "Wed" && <Schedules schedules={WedItems}></Schedules>}
                          {val.dayId == "Thu" && <Schedules schedules={ThuItems}></Schedules>}
                          {val.dayId == "Fri" && <Schedules schedules={FriItems}></Schedules>}
                          {val.dayId == "Sat" && <Schedules schedules={SatItems}></Schedules>}
                          {provided.placeholder}
                        </SDragDropArea>
                      )}
                    </Droppable>
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