import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import styled from "styled-components";

import "./styles.css";

const App = () => {
  // const week = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
  const week = [
    {
      "dow": "日曜日",
      "dayId": "Sun"
    },
    {
      "dow": "月曜日",
      "dayId": "Mon"
    },
    {
      "dow": "火曜日",
      "dayId": "Tue"
    },
    {
      "dow": "水曜日",
      "dayId": "Wed"
    },
    {
      "dow": "木曜日",
      "dayId": "Thu"
    },
    {
      "dow": "金曜日",
      "dayId": "Fri"
    },
    {
      "dow": "土曜日",
      "dayId": "Sat"
    },
  ];

  const [items, setItems] = useState(
    [...Array(4).keys()].map((val) => {
      return{
        id: val,
        text: `田中_${val}`,
        category: "マッサージ",
        eventStart: "11:00",
        eventEnd: "11:15",
        dayId: "Sun"
      }
    })
  );

  const onDragEnd = (result) => {
    const remove = items.splice(result.source.index, 1);
    console.log(remove);
    items.splice(result.destination.index, 0, remove[0]);
    console.log(items);
  };
  

  const onClickAddCard = () => {
    const length = items.length;
    let item = {
      id: length,
      text: `斉藤_${length}`,
      category: "はりきゅう",
      eventStart: "11:00",
      eventEnd: "11:15",
      dow: "sun"
    };
    const newItems = [...items, item]
    setItems(newItems);
  };


  const SKanbanBoard = styled.div`
    display: flex;
    height: 85vh;
  `;

  const SDragDropArea = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 5px;
  `;

  const SDragDropWrapper = styled.div`
    margin: 3px;
    width: 20%;
    text-align: center;
    overflow: scroll;
  `;
  const SScheduleCard = styled.div`
    margin: 5px auto;
    width: 95%;
    height: 120px;
    background-color: #fff;
    border: solid 1px #C8C8C8;
    border-radius: 10px;
  `

  const SAreaTitle = styled.h2`
    color: #344168;
  `

  const STitle = styled.h1`
    color: #344168;
    margin-left: 10px;
  `

  const SPtName = styled.span`
    font-size: 1rem;
    display: block;
  `

  const SCategoryMark = styled.span`
    display: block;
    width: 40%;
    margin: 10px;
    border-radius: 9999px;
    color: #fff;
    font-size: 0.5rem;
    padding: 0.1rem 0.2rem;
  `

  const SMassMark = styled(SCategoryMark)`
    background-color: green;
  `;

  const SHariMark = styled(SCategoryMark)`
    background-color: blue;
  `;

  const SCardText = styled.p`
    display: block;
    font-size: 0.8rem;
  `

  const Sicon = styled.span`
    margin-right: 5px;
  `
  return (
    <>
      <STitle>■デフォルトスケジュール</STitle>
      <SKanbanBoard>
        {week.map((val) => (
          <>
            <SDragDropWrapper  key={val.dow}>
            <SAreaTitle>{val.dow}</SAreaTitle>
            <SDragDropArea>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={val.dow}>
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? '#f0f8ff' : '' }}>
                    {items.map((item, index) => (
                      <Draggable draggableId={item.text} index={index} key={item.id} dow={item.dow}>
                        {(provided) =>
                          <SScheduleCard
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <SPtName><Sicon><i class="fas fa-user-injured"></i></Sicon>{item.text}</SPtName>
                              {item.category == "マッサージ"? <SMassMark>{item.category}</SMassMark> : <SHariMark>{item.category}</SHariMark> }
                              <SCardText><Sicon><i class="fas fa-user-md"></i></Sicon>斉藤優</SCardText>
                              <SCardText><Sicon><i class="far fa-clock"></i></Sicon>{item.eventStart}〜{item.eventEnd}</SCardText>
                          </SScheduleCard>
                        }
                      </Draggable>
                    ))}
                      {provided.placeholder}
                      <button onClick={onClickAddCard}>追加</button>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </SDragDropArea>
            </SDragDropWrapper>
          </>
        ))}
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