import { Signup, PrimaryButton } from './Utility';
import { useState } from 'react';

function ForgotPassword({ setAuth, setLForm, setForgotPass }) {
  const [sform, setSForm] = useState({
    email: '',
    pin: '',
    password: '',
  });

  const [isOTPRequested, setOTPRequested] = useState(false); // State to handle OTP request
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  // Handle input changes
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
        setOTPRequested(true); // Mark OTP as requested
        setErrorMessage(''); // Clear any previous errors
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

      const result = await response.json();  // Parse the JSON response
      if (response.ok) {
        setSuccessMessage('Password reset successful');
        // Redirect or handle login form here
        setErrorMessage(''); // Clear error message
        setLForm(true); // Optionally switch back to login form
      } else {
        setErrorMessage(result.message || 'Error resetting password');
        setSuccessMessage(''); // Clear success message if error
      }
    } catch (error) {
      setErrorMessage('Error resetting password');
      setSuccessMessage(''); // Clear success message if error
    }
  };

  // Styling for the form
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
    button: {
      alignSelf: 'flex-start',
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
          <PrimaryButton onClick={requestOTP} style={styles.button}>
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

            <PrimaryButton type="submit" style={styles.button}>
              Reset password
            </PrimaryButton>
          </>
        )}
      </form>
    </Signup>
  );
}

export default ForgotPassword;
