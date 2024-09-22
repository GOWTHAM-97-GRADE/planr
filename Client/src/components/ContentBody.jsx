import Task from "./Task";
import TaskColumn from "./TaskColumn";
import TaskEdit from "./TaskEdit";
import Account from "./Account";
import Notification from "./Notification";
import { PrimaryButton, svgIconStyle, BodyContainer, TaskGroup, TaskItem, EditPopup } from "./Utility";

function ContentBody({editPopupState, setEditPopupOpenState, category, setCategory, taskId, setTaskId, page,setPage, notify, setNotify, setAuth,setForgotPass}) {
    return (
    <div  style={{width:"100%"}}>
    <BodyContainer>
        <TaskColumn title={category} editPopupState = {editPopupState} setEditPopupOpenState = {setEditPopupOpenState} setCategory={setCategory} taskId={taskId} setTaskId={setTaskId} page={page} setPage={setPage}/>
        {(editPopupState<0 || editPopupState>2) &&
          <TaskGroup style={{flex: '0 0 35%'}}>

          <h2>Your Stats</h2>
          <TaskItem>
              <p style={{color:"#276cab", fontSize:"60px", fontWeight:"800", margin:"8px"}}>95%</p>
              <p style={{color:"black", fontSize:"20px", fontWeight:"400",alignSelf :"center"}}>Task completion rate</p>
          </TaskItem>
          <TaskItem>
              <p style={{color:"#008b10", fontSize:"60px", fontWeight:"800", margin:"8px"}}>15%</p>
              <p style={{color:"black", fontSize:"20px", fontWeight:"400",alignSelf :"center"}}>More productive this week</p>
          </TaskItem>

          <TaskItem style={{flexDirection:"column"}} >
              <h3>Most productive time of a day</h3>
              <p style={{color:"#276cab", fontSize:"56px", fontWeight:"800", margin:"8px"}}>Morning</p>
          </TaskItem>
          <TaskItem style={{flexDirection:"column"}} >
              <h3>Most productive day of the week</h3>
              <p style={{color:"#276cab", fontSize:"56px", fontWeight:"800", margin:"8px"}}>Monday</p>
          </TaskItem>
          <TaskItem style={{flexDirection:"column"}} >
              <h3>Most productive task type</h3>
              <p style={{color:"#276cab", fontSize:"56px", fontWeight:"800", margin:"8px"}}>Household</p>
          </TaskItem>
        </TaskGroup>}
        {editPopupState==0 && <TaskEdit close={setEditPopupOpenState}  taskId={taskId} setTaskId={setTaskId} />}
        {editPopupState==1 && <Account close={setEditPopupOpenState} setAuth={setAuth} setForgotPass={setForgotPass}/>}
        {editPopupState==2 && <Notification close={setEditPopupOpenState} selectedOption={notify} setSelectedOption={setNotify}/>}
    </BodyContainer>
    </div>
  );
}

export default ContentBody;
