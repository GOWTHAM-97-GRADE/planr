import { Signup } from './Utility'; // Removed PrimaryButton from here
import { useState } from 'react';
import styled from 'styled-components'; // Added styled-components

// Styled PrimaryButton using styled-components
const PrimaryButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function ForgotPassword({ setAuth, setLForm, setForgotPass }) {
  const [sform, setSForm] = useState({
    email: '',
    pin: '',
    password: '',
  });

  const [isOTPRequested, setOTPRequested] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangeS = (e) => {
    const { name, value } = e.target;
    setSForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Request OTP function
  const requestOTP = async () => {
    try {
      const response = await fetch('http://localhost:5000/password/send-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sform.email }),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('OTP sent to your email');
        setOTPRequested(true);
        setErrorMessage('');
      } else {
        setErrorMessage(result.message || 'Error sending OTP');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error sending OTP');
      setSuccessMessage('');
    }
  };

  // Reset password function
  const resetPassword = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const response = await fetch('http://localhost:5000/password/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: sform.email,
          pin: sform.pin,
          password: sform.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('Password reset successful');
        setErrorMessage('');
        // Redirect to login after successful password reset
        setLForm(true);
      } else {
        setErrorMessage(result.message || 'Error resetting password');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error resetting password');
      setSuccessMessage('');
    }
  };

  // Go back to login if password reset is canceled or completed
  const redirectToLogin = () => {
    setLForm(true);
    setForgotPass(false);
  };

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      padding: '20px',
      maxWidth: '500px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    label: {
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
    },
    message: {
      color: 'green',
    },
  };

  return (
    <Signup>
      <h2>Account Recovery</h2>

      {/* Display error messages */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {/* Display success messages */}
      {successMessage && <div style={styles.message}>{successMessage}</div>}

      <form onSubmit={resetPassword} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={sform.email}
            onChange={handleChangeS}
            style={styles.input}
            required
          />
        </div>

        {/* Show "Send mail" button if OTP hasn't been requested yet */}
        {!isOTPRequested && (
          <PrimaryButton onClick={requestOTP} type="button">
            Send mail
          </PrimaryButton>
        )}

        {/* If OTP is requested, show OTP and password fields */}
        {isOTPRequested && (
          <>
            <div style={styles.formGroup}>
              <label htmlFor="pin" style={styles.label}>6 Digit OTP:</label>
              <input
                type="text"
                id="pin"
                name="pin"
                value={sform.pin}
                onChange={handleChangeS}
                style={styles.input}
                required
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
                required
              />
            </div>

            <PrimaryButton type="submit">
              Reset password
            </PrimaryButton>
          </>
        )}

        {/* Cancel and go back to login page */}
        <PrimaryButton onClick={redirectToLogin} type="button">
          Return to Login Page
        </PrimaryButton>
      </form>
    </Signup>
  );
}

export default ForgotPassword;
