import styled from 'styled-components';
import ForgotPassword from "./ForgotPassword";
import { useState } from "react";

// Styled Components Definition
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 36px;
  }

  p {
    font-size: 18px;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const PrimaryButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: #007bff;
  border: none;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;

const ToggleLink = styled.button`
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Signup Form Validation
    if (isSignup) {

      if (!sform.name || !sform.email || !sform.password || !sform.confirmPassword) {
        alert("All fields are required for signup");
        return;
      }

      if (sform.password !== sform.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: sform.name,
          email: sform.email,
          password: sform.password,
          confirmPassword:sform.confirmPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Signup successful");
        setAuth(true);
        setForgotPass(false);
      } else {
        alert(result.message || "Error in signup");
      }
    } else {
      // Login Form Validation
      if (!lform.email || !lform.password) {
        alert("Email and password are required for login");
        return;
      }

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
        setAuth(true);
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
          {!isForgotPass && !isSignup && (
            <div>
              <FormTitle>Login</FormTitle>
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
              <ToggleLink onClick={() => setSignup(true)}>Don't have an account? Signup</ToggleLink>
            </div>
          )}
          {!isForgotPass && isSignup && (
            <div>
              <FormTitle>Signup</FormTitle>
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
              <ToggleLink onClick={() => setSignup(false)}>Already have an account? Login</ToggleLink>
            </div>
          )}
          {isForgotPass && (
            <ForgotPassword setAuth={setAuth} setLForm={setLForm} setForgotPass={setForgotPass} />
          )}
        </AuthContainer>
      </LoginContainer>
    </div>
  );
}

export default LoginPage;
