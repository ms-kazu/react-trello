// import React, {useState} from 'react';
import styled from "styled-components";
import {Draggable} from 'react-beautiful-dnd';

export const Schedules = (props) => {
  const {schedules} = props;

  const SPtName = styled.span`
    font-size: 1rem;
    display: block;
  `
  const SScheduleCard = styled.div`
    margin: 5px auto;
    padding: 3px;
    width: 95%;
    height: 120px;
    background-color: #fff;
    border: solid 1px #C8C8C8;
    border-radius: 10px;
  `
  const SCategoryMark = styled.span`
    display: block;
    width: 30%;
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

  return(
    <>
    {schedules.map((item, index) => (
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
    </>
  )
}