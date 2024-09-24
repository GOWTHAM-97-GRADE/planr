import ForgotPassword from "./ForgotPassword";
import { LoginContainer, Title, AuthContainer, Login, Help, Signup, PrimaryButton, SecondaryButton } from "./Utility";
import { useState } from "react";

function LoginPage({ setAuth, isForgotPass, setForgotPass }) {
  const [lform, setLForm] = useState({
    email: "",
    password: ""
  });

  const [sform, setSForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

  // Signup or Login Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignup) {
      // Signup logic
      if (sform.password !== sform.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // POST request to the /signup endpoint
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: sform.name,
          email: sform.email,
          password: sform.password,
          confirmPassword: sform.confirmPassword, // Added confirmPassword for validation
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Signup successful");
        setAuth(true); // User is authenticated
        setForgotPass(false);
      } else {
        alert(result.message || "Error in signup");
      }
    } else {
      // Login logic
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: lform.email,
          password: lform.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Login successful");
        setAuth(true); // Set authentication state
        setForgotPass(false);
      } else {
        alert(result.message || "Invalid login credentials");
      }
    }
  };

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      padding: '20px',
      maxWidth: '500px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    label: {
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: "left"
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
    <div style={{ minWidth: "1080px" }}>
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
              <PrimaryButton type="submit" style={styles.button}>Login</PrimaryButton>
              <SecondaryButton onClick={() => setForgotPass(true)}>Forgot Password</SecondaryButton>
            </form>
          </Login>}
          {isForgotPass && <ForgotPassword setAuth={setAuth} setLForm={setLForm} setForgotPass={setForgotPass} />}
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
              <div style={styles.formGroup}>
                <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={sform.confirmPassword}
                  onChange={handleChangeS}
                  style={styles.input}
                />
              </div>
              <PrimaryButton type="submit" style={styles.button}>Signup</PrimaryButton>
            </form>
          </Signup>}
        </AuthContainer>
      </LoginContainer>
    </div>
  );
}

export default LoginPage;
