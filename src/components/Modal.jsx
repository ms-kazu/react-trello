import { useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import UUID from 'uuidjs';
import { patientState } from "../store/patientState";
import { modalState, modalActionState } from "../store/modalState";
import { practitionerState } from "../store/practitionerState";
import { selectedWeekState } from "../store/weekState";
import { categoryState } from "../store/categoryState";
import { editItemState } from "../store/scheduleState";

const practitioners = ["斉藤優", "田中修", "鈴木雄也"];
const patients = ["橋本 敦", "安達 行雄", "松本 峰", "大和田野 走榛", "宮本 陸斗", "仁八 冠馬", "白河部 陽士郎", "行田 絃輔", "割沢 デンザブロウ", "中岫 永琉斗"];
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

const SModal = styled.div`
    position: fixed;
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    border: none;
    height: 62vh;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    transform:translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
    -ms-transform: translateY(-50%) translateX(-50%);
    text-align: center;

    h2{
      color: #344168;
      border-bottom: 1px solid gray;
      margin-top: 0;
      padding-bottom: 10px;
    }
  `

  const SModalBack = styled.div`
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;
  `

  const SModalCloseButton = styled.button`
    margin: 5px;
    background-color: #fff;
    border: none;
    font-size: 15px;
  `

  const SCloseButtonWrapper = styled.div`
    text-align: right;
  `
  const SInputFormWrapper = styled.div`
    margin-top: 30px;
    text-align: center;
  `

  const SInputTable = styled.table`
    width: 500px;
    display: inline;

    tr td{
      font-size: 20px;
      padding-bottom: 20px;
      padding-left: 15px;
    }
  `

  const SBasicButton = styled.button`
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 15px;
    font-weight: bold;
    width: 100px;
  `

  const SAddButton = styled(SBasicButton)`
    background-color: #fff;
    color: #37B0BE;
    border: 2px solid #37B0BE;
    :hover{
      background-color: #37B0BE;
      color: #fff;
      border: 2px solid #37B0BE;
      cursor: pointer;
    }
  `

  const SCloseButton = styled(SBasicButton)`
  background-color: #fff;
  color: gray;
  border: 2px solid gray;
  :hover{
    background-color: gray;
    color: #fff;
    border: 2px solid gray;
    cursor: pointer;
  }
`

export const Modal = (props) => {
  const {allItems} = props;
  const action = useRecoilValue(modalActionState);
  const editItem = useRecoilValue(editItemState);
  const [show, setShow] = useRecoilState(modalState);
  
  // モーダル監視用
  const [patient, setPatient] = useRecoilState(patientState);
  const [practitioner, setPractitioner] = useRecoilState(practitionerState);
  const [eventStart, setEventStart] = useState();
  const [eventEnd, setEventEnd] = useState();
  const [selectedWeek, setSelectedWeek] = useRecoilState(selectedWeekState);
  const [category, setCategory] = useRecoilState(categoryState);

  const onClickModalClose = () => {
    setShow(!show);
  }

  const onClickAdd = () => {
    const dayId = selectedWeek;
    const newItem ={
      id: UUID.generate(),
      patient: patient,
      practitioner: practitioner,
      eventStart: eventStart,
      eventEnd: eventEnd,
      category: category,
      dayId: dayId
    }
    const targetColumn = allItems[dayId];
    const newItems = [...targetColumn[0], newItem];
    targetColumn[1](newItems);
    setShow(!show);
  }

  const onClickEdit = (sourceId, sourceDayId, sourcePatient, sourcePractitioner, sourceEventStart, sourceEventEnd, sourceCategory) => {
    const dayId = selectedWeek;
    const id = sourceId;
    console.log(selectedWeek);
    console.log(sourceDayId);
    const editItem ={
      id: id,
      patient: patient ? patient : sourcePatient,
      practitioner: practitioner ? practitioner : sourcePractitioner,
      eventStart: eventStart ? eventStart : sourceEventStart,
      eventEnd: eventEnd ? eventEnd : sourceEventEnd,
      category: category ? category : sourceCategory,
      dayId: dayId ? dayId : sourceDayId
    }

    if (dayId == sourceDayId) {
      const copiedColumItems = [...allItems[sourceDayId]];
      const copiedItemIndex = copiedColumItems[0].findIndex(({id}) => id === sourceId);
      copiedColumItems[0].splice(copiedItemIndex, 1);
      copiedColumItems[0].splice(copiedItemIndex, 0, editItem);
      copiedColumItems[1](copiedColumItems[0]);
    }else{
      const targetColumn = allItems[dayId];
      const newItems = [...targetColumn[0], editItem];
      targetColumn[1](newItems);
  
      const sourceColumn = allItems[sourceDayId];
      const sourceIndex = sourceColumn[0].findIndex(({id}) => id === sourceId);
      sourceColumn[0].splice(sourceIndex, 1);
    }


    setShow(!show)
  }

  if (show && action == "add") {
    return(
      <>
        <SModalBack onClick={onClickModalClose}></SModalBack>
        <SModal>
          <SCloseButtonWrapper>
            <SModalCloseButton onClick={onClickModalClose}>✖️</SModalCloseButton>
          </SCloseButtonWrapper>
          <h2>デフォルトスケジュール登録</h2>
          <SInputFormWrapper>
            <SInputTable>
              <tbody>
                <tr>
                  <td><label htmlFor="">患者名</label></td>
                  <td>
                    <select name="patients" id="patients-select" onChange={(e) => setPatient(e.target.value)}>
                      <option value="">--患者を選択してください--</option>
                      {patients.map((patient) => {
                        return(
                          <option value={patient}>{patient}</option>
                        )
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="">担当者名</label></td>
                    <select name="practitioners" id="practitioners-select" onChange={(e) => setPractitioner(e.target.value)}>
                      <option value="">--患者を選択してください--</option>
                      {practitioners.map((practitioner) => {
                        return(
                          <option value={practitioner}>{practitioner}</option>
                        )
                      })}
                    </select>
                </tr>
                <tr>
                  <td><label htmlFor="">開始時間</label></td>
                  <td> 
                    <input type="time" name="eventStart" id="eventStart" step="300" required="required" onChange={(e) => setEventStart(e.target.value)}/>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="">終了時間</label></td>
                  <td> 
                    <input type="time" name="eventEnd" id="eventEnd" step="300" required="required" onChange={(e) => setEventEnd(e.target.value)}/>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="">曜日</label></td>
                  <td>
                    <select name="practitioners" id="practitioners-select" onChange={(e) => setSelectedWeek(e.target.value)}>
                      <option value="">--曜日を選択してください--</option>
                      {week.map((val) => {
                        return(
                          <option value={val.dayId}>{val.dow}</option>
                        )
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="">カテゴリ</label></td>
                  <td>
                    <select name="category" id="category-select" onChange={(e) => setCategory(e.target.value)}>
                      <option value="">--カテゴリを選択してください--</option>
                      <option value="マッサージ">マッサージ</option>
                      <option value="はりきゅう">はりきゅう</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><SCloseButton onClick={onClickModalClose}>閉じる</SCloseButton></td>
                  <td><SAddButton onClick={onClickAdd}>登録</SAddButton></td>
                </tr>
              </tbody>
            </SInputTable>
          </SInputFormWrapper>
        </SModal>
      </>
    )
  }else if(show && action == "edit"){
    return(
      <>
        <SModalBack onClick={onClickModalClose}></SModalBack>
        <SModal>
          <SCloseButtonWrapper>
            <SModalCloseButton onClick={onClickModalClose}>✖️</SModalCloseButton>
          </SCloseButtonWrapper>
          <h2>デフォルトスケジュール編集</h2>
          <SInputFormWrapper>
            <SInputTable>
              <tbody>
                <tr>
                  <td><label htmlFor="">患者名</label></td>
                  <td>
                    <select name="patients" id="patients-select" onChange={(e) => setPatient(e.target.value)}>
                      <option value="">--患者を選択してください--</option>
                      {patients.map((patient) => {
                        return(
                          <>
                          {editItem.patient == patient ? <option value={patient} selected>{patient}</option> : <option value={patient}>{patient}</option>}
                          </>
                        )
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="">担当者名</label></td>
                    <select name="practitioners" id="practitioners-select" onChange={(e) => setPractitioner(e.target.value)}>
                      <option value="">--患者を選択してください--</option>
                      {practitioners.map((practitioner) => {
                        return(
                          <>
                          {editItem.practitioner == practitioner ? <option value={practitioner} selected>{practitioner}</option> : <option value={practitioner}>{practitioner}</option>}
                          </>
                        )
                      })}
                    </select>
                </tr>
                <tr>
                  <td><label htmlFor="">開始時間</label></td>
                  <td> 
                    <input type="time" name="eventStart" id="eventStart" step="300" required="required" value={eventStart} onChange={(e) => setEventStart(e.target.value)}/>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="">終了時間</label></td>
                  <td> 
                    <input type="time" name="eventEnd" id="eventEnd" step="300" required="required" value={eventEnd} onChange={(e) => setEventEnd(e.target.value)}/>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="">曜日</label></td>
                  <td>
                    <select name="practitioners" id="practitioners-select" onChange={(e) => setSelectedWeek(e.target.value)}>
                      <option value="">--曜日を選択してください--</option>
                      {week.map((val) => {
                        return(
                          <>
                          {editItem.dayId == val.dayId ? <option value={val.dayId} selected>{val.dow}</option> : <option value={val.dayId}>{val.dow}</option>}
                          </>
                        )
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="">カテゴリ</label></td>
                  <td>
                    <select name="category" id="category-select" onChange={(e) => setCategory(e.target.value)}>
                      <option value="">--カテゴリを選択してください--</option>
                      {editItem.category == "マッサージ" ? <option value="マッサージ" selected>マッサージ</option> : <option value="マッサージ" >マッサージ</option>}
                      {editItem.category == "はりきゅう" ? <option value="はりきゅう" selected>はりきゅう</option> : <option value="はりきゅう">はりきゅう</option>}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><SCloseButton onClick={onClickModalClose}>閉じる</SCloseButton></td>
                  <td><SAddButton onClick={() => onClickEdit(editItem.id, editItem.dayId, editItem.patient, editItem.practitioner, editItem.eventStart, editItem.eventEnd, editItem.category)}>変更</SAddButton></td>
                </tr>
              </tbody>
            </SInputTable>
          </SInputFormWrapper>
        </SModal>
      </>
    )
  }else{
    return null
  }
}