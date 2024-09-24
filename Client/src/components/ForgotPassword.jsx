import { Signup,PrimaryButton} from './Utility';
import { useState } from 'react';

function ForgotPassword({setAuth,setLForm,setForgotPass}) {
    const [sform, setSForm] = useState({
        name  : "",
        email : "",
        password: "",
        pin :""
      });
    
      const [isSignup, setSignup] = useState(false);
    
      const handleChangeS = (e) => {
        const { name, value } = e.target;
        setSForm((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      
      const handleChangeL = (e) => {
        const { name, value } = e.target;
        setLForm((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', sform);
        // Perform form submission logic here
        setAuth(true);
        setForgotPass(false);
    
      };
    
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
  return (
    
    <Signup>
    <h2>Account Recovery</h2>
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="email" style={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={sform.email}
          onChange={handleChangeS}
          style={styles.input}
        />
      </div>
      {!isSignup && <PrimaryButton onClick={() => setSignup(true)}>Send mail</PrimaryButton>}
      
      {isSignup && 
      <div style={{display:"flex", flexDirection:"column", gap:"24px"}}>
        <div style={styles.formGroup}>
        <label htmlFor="pin" style={styles.label}>6 Digit OTP:</label>
        <input
          type="text"
          id="pin"
          name="pin"
          value={sform.pin}
          onChange={handleChangeS}
          style={styles.input}
        />
      </div>
        <div style={styles.formGroup}>
        <label htmlFor="password" style={styles.label}>New Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={sform.password}
          onChange={handleChangeS}
          style={styles.input}
        />
      </div>
      <PrimaryButton onClick={handleSubmit} type="submit" style={styles.button}>Reset password</PrimaryButton>
      </div>}
    </form>
    </Signup>
  );
}

export default ForgotPassword;