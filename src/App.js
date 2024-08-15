import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ContentBody from './components/ContentBody';
import { useState } from 'react';
import TaskEdit from './components/TaskEdit';
import LoginPage from './components/Login.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';

function App() {
  const [editPopupOpen, setEditPopupOpen]  =  useState(-1);
  const [category, setCategory] = useState("Home");
  const [currentTaskId, setCurrentTaskId] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [notifyType, setNotifyType] = useState("all");
  const [auth, setAuth] = useState(false);
  const [isForgotPass, setForgotPass] = useState(false);
  return (
    
       <div className="App" style={{minWidth:"1080px"}}>
        {(!auth || isForgotPass) && <LoginPage setAuth={setAuth} isForgotPass={isForgotPass} setForgotPass={setForgotPass}/>}
      {auth && !isForgotPass && <div><Header sideColumn={editPopupOpen}  setSideColumn={setEditPopupOpen} />
      <div style={{ display: "flex", flexDirection: "row", height: "100vh",width : "100%" }}>
        <Sidebar editPopupState = {editPopupOpen} setEditPopupOpenState = {setEditPopupOpen} setCategory={setCategory} category={category} taskId={currentTaskId} setTaskId={setCurrentTaskId} setPage={setCurrentPage}/>
        <ContentBody editPopupState = {editPopupOpen} setEditPopupOpenState = {setEditPopupOpen} category={category} setCategory={setCategory} taskId={currentTaskId} setTaskId={setCurrentTaskId} page={currentPage} setPage={setCurrentPage} notify={notifyType} setNotify={setNotifyType} setAuth={setAuth} setForgotPass={setForgotPass}/>
      </div>
      </div>}
    </div>
  );
}

export default App;
