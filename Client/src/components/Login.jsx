import ForgotPassword from "./ForgotPassword";
import { LoginContainer, Title, AuthContainer, Login, Help, Signup, PrimaryButton, SecondaryButton } from "./Utility";
import { useState } from "react";


function LoginPage({setAuth, isForgotPass, setForgotPass}) {
  const [lform, setLForm] = useState({
    email  : "",
    password  : ""
  });
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
    <div style={{minWidth:"1080px"}}>
      <LoginContainer>
        <Title>
          <h1>PLAN-R</h1>
          <p>An Intelligent activity planner and tracker</p>
        </Title>
        <AuthContainer>
        {!isForgotPass && <Login>
              <h2>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={lform.email}
                  onChange={handleChangeL}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={lform.password}
                  onChange={handleChangeL}
                  style={styles.input}
                />
              </div>
              <PrimaryButton onClick={handleSubmit} type="submit" style={styles.button}>Login</PrimaryButton>
              <SecondaryButton onClick={() => setForgotPass(true)}>Forgot Password</SecondaryButton>
            </form>
            </Login>}
            {isForgotPass && <ForgotPassword setAuth={setAuth} setLForm={setLForm} setForgotPass={setForgotPass}/> }
            {!isForgotPass && <Signup>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={sform.name}
                  onChange={handleChangeS}
                  style={styles.input}
                />
              </div>
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
              {!isSignup && <PrimaryButton onClick={() => setSignup(true)}>Signup</PrimaryButton>}
              
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
                <label htmlFor="password" style={styles.label}>Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={sform.password}
                  onChange={handleChangeS}
                  style={styles.input}
                />
              </div>
              <PrimaryButton onClick={handleSubmit} type="submit" style={styles.button}>Signup</PrimaryButton>
              </div>}
            </form>
            </Signup>}
            
        </AuthContainer>
      </LoginContainer>
    </div>
  );
}

export default LoginPage;