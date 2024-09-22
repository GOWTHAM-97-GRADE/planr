import React, { useState } from 'react';
import { PrimaryButton, EditPopup, SecondaryButton, svgIconStyle } from './Utility'; // Import relevant component

const Notification = ({close, selectedOption, setSelectedOption}) => {

  // Common styles for radio input (hidden)
  const radioStyle = {
    display: 'none',
  };

  // Style for the custom radio button appearance
  const spanStyle = {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '4px solid #007bff',
    backgroundColor: '#fff',
    marginRight: '8px',
    position: 'relative',
    verticalAlign: 'middle',
  };

  // Style for the checked state of the custom radio button
  const checkedSpanStyle = {
    ...spanStyle,
    backgroundColor:"rgb(249 206 137)",
    borderColor: "#0562a5" ,
  };

  // Common styles for label and container
  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '8px',
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

    return(
        <EditPopup style={{height: "400px"}}>
            <PrimaryButton onClick={()=>close(-1)} style={{width:"90px", padding:"12px 20px 12px 16px", background:"white", color:"black"}}>Close</PrimaryButton>
            <div>
                <p style={{fontSize:"32px", fontWeight:"600"}}>Notifications</p>
                <p style={{fontSize:"20px", fontWeight:"400"}}>select notification type</p>
            </div>
            <div style={{display : "flex", flexDirection:"column", gap : "24px"}}>
      <div style={containerStyle}>
        <label style={labelStyle}>
          <input
            type="radio"
            name="option"
            value="all"
            checked={selectedOption === 'all'}
            onChange={() => setSelectedOption('all')}
            style={radioStyle}
          />
          <span style={selectedOption === 'all' ? checkedSpanStyle : spanStyle}></span>
          All
        </label>
      </div>
      <div style={containerStyle}>
        <label style={labelStyle}>
          <input
            type="radio"
            name="option"
            value="priority only"
            checked={selectedOption === "priority only"}
            onChange={() => setSelectedOption("priority only")}
            style={radioStyle}
          />
          <span style={selectedOption === "priority only" ? checkedSpanStyle : spanStyle}></span>
          Priority only
        </label>
      </div>
      <div style={containerStyle}>
        <label style={labelStyle}>
          <input
            type="radio"
            name="option"
            value="mute"
            checked={selectedOption === 'mute'}
            onChange={() => setSelectedOption('mute')}
            style={radioStyle}
          />
          <span style={selectedOption === 'mute' ? checkedSpanStyle : spanStyle}></span>
          Mute
        </label>
      </div>
    </div>
        </EditPopup>
    );
}

export default Notification;