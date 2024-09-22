import { useSearchParams } from "react-router-dom";
import { PrimaryButton, svgIconStyle, TaskItem } from "./Utility";
import { useState } from "react";
import styled from "styled-components";

function Task({editPopupState, setEditPopupOpenState, setCategory,taskId, setTaskId, id, completionType}) {
    const PopupToggle = () => {
        setEditPopupOpenState(0);
        setTaskId(id);
    }
    const EditButton = styled(PrimaryButton)`
    height:20px;
    background:rgb(235 235 235);
    &:hover{
        background: rgb(249 206 137);
        }
    `;
    return (
        <TaskItem>
        <div style={{display:"flex", flexDirection:"column", gap:"4px",padding:"0px 16px"}}>
          <h3 style={{textAlign:"left", margin:"16px 0px"}}>Task title</h3>
          <div style={{display:"flex", flexDirection:"row", gap:"12px"}}>
            <p onClick={()=>setCategory("Household")} style={{color:"#0562a5", textDecoration:"underline", cursor:"pointer"}}><svg style={{...svgIconStyle, marginRight:"6px"  ,height:"20px", width : "20px", fill:"black", verticalAlign:"bottom"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16,17H5V7H16L19.55,12M17.63,5.84C17.27,5.33 16.67,5 16,5H5A2,2 0 0,0 3,7V17A2,2 0 0,0 5,19H16C16.67,19 17.27,18.66 17.63,18.15L22,12L17.63,5.84Z" /></svg>Household</p>
            <p style={{color:completionType==1?"red":completionType==0?"grey":"black"}}><svg style={{...svgIconStyle, height:"20px", width : "20px", marginRight:"6px"  ,fill:completionType==1?"red":completionType==0?"grey":"black", verticalAlign:"bottom"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" /></svg>12 AUG - 10 pm </p>
          </div>
        </div>
        <div style={{display:"flex", flexDirection:"row", gap:"12px"}}>
          
          {completionType!=0 && <EditButton onClick={PopupToggle}><svg style={{...svgIconStyle, fill:"black",height:"20px", width:"20px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg></EditButton>}
          <PrimaryButton style={{height:"20px", background:completionType==1?"grey":completionType==0?"grey":"rgb(249 206 137)", color:"black"}}>{completionType==1?"Timeup":completionType==0?"Marked as done":"Mark as Done"}</PrimaryButton>
        </div>
      </TaskItem>
  );
}

export default Task;
