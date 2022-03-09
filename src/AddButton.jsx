import styled from "styled-components";

export const Addbutton = (props) => {
  const {val, onClickAddCard} = props;

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

  return(
    <SAddbutton 
      value={val.dayId} 
      onClick={onClickAddCard}
    >
      ＋
    </SAddbutton>
  )
}