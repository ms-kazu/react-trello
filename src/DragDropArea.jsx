import {Droppable} from 'react-beautiful-dnd';
import styled from "styled-components";


import { Schedules } from './Schedules';

export const DragDropArea = (props) => {
  const {val, allItems} = props;
  const SDragDropArea = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
  margin: 3px;
  max-height: 665px;
  text-align: center;
  overflow: scroll;
`;
  return(
    <Droppable droppableId={val.dayId} key={val.dayId}>
      {(provided, snapshot) => (
        <SDragDropArea 
          {...provided.droppableProps} 
          ref={provided.innerRef} 
          style={{ 
            backgroundColor: snapshot.isDraggingOver ? val.color : '',
          }}
        >
        <Schedules schedules={allItems[val.dayId][0]} setSchedules={allItems[val.dayId][1]}></Schedules>
          {provided.placeholder}
        </SDragDropArea>
      )}
    </Droppable>
  )
}

// {val.dayId == "Sun" && <Schedules schedules={allItems[val.dayId][0]}></Schedules>}
// {val.dayId == "Mon" && <Schedules schedules={MonItems}></Schedules>}
// {val.dayId == "Tue" && <Schedules schedules={TueItems}></Schedules>}
// {val.dayId == "Wed" && <Schedules schedules={WedItems}></Schedules>}
// {val.dayId == "Thu" && <Schedules schedules={ThuItems}></Schedules>}
// {val.dayId == "Fri" && <Schedules schedules={FriItems}></Schedules>}
// {val.dayId == "Sat" && <Schedules schedules={SatItems}></Schedules>}