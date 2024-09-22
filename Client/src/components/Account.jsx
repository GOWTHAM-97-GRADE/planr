import React, { useState } from 'react';
import { PrimaryButton, EditPopup, SecondaryButton, svgIconStyle } from './Utility'; // Import relevant component

const Account = ({close, setAuth, setForgotPass}) => {

    const closeAndLogout = () =>{
        close(-1);
        setAuth(false);
    }
    return(
        <EditPopup style={{height: "460px"}}>
            <PrimaryButton onClick={()=>close(-1)} style={{width:"90px", padding:"12px 20px 12px 16px", background:"white", color:"black"}}>Close</PrimaryButton>
            <div>
                <p style={{fontSize:"32px", fontWeight:"600"}}>John Wick</p>
                <p style={{fontSize:"20px", fontWeight:"400"}}>johnwick@eg.com</p>
            </div>
            <PrimaryButton onClick={() =>  setForgotPass(true)} style={{background:"transparent", color:"#1b1b1b"}}>Change Password</PrimaryButton>
            <PrimaryButton style={{background :"transparent", borderColor:"#c94747", color :"#c94747"}} onClick={closeAndLogout}>Logout</PrimaryButton>
            <PrimaryButton  style={{background : "#c94747"}} onClick={closeAndLogout}>Delete Account</PrimaryButton>
        </EditPopup>
    );
}

export default Account;