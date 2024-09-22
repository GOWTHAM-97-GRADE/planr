import React, { useState } from 'react';
import { PrimaryButton, EditPopup, SecondaryButton, svgIconStyle } from './Utility'; // Import relevant components

const TaskEdit = ({close,taskId, setTaskId}) => {
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    type: '',
    importantLevel: 1,
  });

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle change for important level (which is a number)
  const handleImportantLevelChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      importantLevel: Number(value),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Perform form submission logic here
  };

  return (
    <EditPopup>
      <h2>{taskId!==-1 ? "Edit" : "Add"} Task Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Task Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="time" style={styles.label}>Deadline Time:</label>
          <input
            type="datetime-local"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="type" style={styles.label}>Category:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="importantLevel" style={styles.label}>Important Level (out of 5):</label>
          <input
            type="number"
            id="importantLevel"
            name="importantLevel"
            min="1"
            max="5"
            value={formData.importantLevel}
            onChange={handleImportantLevelChange}
            style={styles.input}
          />
        </div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        {(taskId!==-1) && <SecondaryButton onClick={() => close(-1)} type="submit" style={{...styles.button,background:"rgb(253 202 202)"}}><svg style={{...svgIconStyle, fill : "red", height:"20px", width:"20px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></SecondaryButton>}
        <SecondaryButton onClick={() => close(-1)} style={styles.button}>Cancel</SecondaryButton>
            <PrimaryButton onClick={() => close(-1)} type="submit" style={styles.button}>Submit</PrimaryButton>
        </div>
      </form>
    </EditPopup>
  );
};

// Inline styles for form elements
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px', // Space between form groups
    padding: '20px',
    maxWidth: '500px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px', // Space between label and input
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign : "left"
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    alignSelf: 'flex-start',
  },
};

export default TaskEdit;
