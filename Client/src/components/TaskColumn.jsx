import Task from "./Task";
import { PrimaryButton, svgIconStyle, BodyContainer, TaskGroup, TaskItem } from "./Utility";

function TaskColumn({title, editPopup, editPopupState, setEditPopupOpenState, setCategory, taskId, setTaskId, page, setPage}) {
    const inc = () =>{
        setPage(page+1);
    }

    const dec = () =>{
        if(page>1) {setPage(page-1);}
    }
    return (
    <TaskGroup style={{flex: '0 0 55%'}}>
          <h2 style={{textAlign:"left", marginLeft:"24px"}}>Tasks for {title=="Home"?"Today":title} ({page})</h2>
          {Array.from({ length: 5 }, (_, index) => (
                <Task editPopupState = {editPopupState} setEdit={editPopup} setEditPopupOpenState = {setEditPopupOpenState} setCategory = {setCategory}  taskId={taskId} setTaskId={setTaskId} id={index}  completionType={title=="Completed" ? 0 : title=="Timeup" ? 1 : -1}/>
            ))}
          <div style={{display:"flex", flexDirection:"row", padding:"32px", justifyContent:"center", gap:"24px", cursor:"pointer"}}>
            <a style={{textDecoration:"underline", color:(page==1) ? "grey" : "#0562a5"}} onClick={dec}>Prev</a>
            <a style={{color:"#0562a5"}}>{page}</a>
            <a style={{textDecoration:"underline", color:"#0562a5"}} onClick={inc}>Next</a>
          </div>
        </TaskGroup>
  );
}

export default TaskColumn;
