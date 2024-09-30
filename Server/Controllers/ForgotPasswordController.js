const ForgotPasswordModel = require('../Models/ForgotPasswordModel');
const AuthModel = require('../Models/AuthModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Helper function to generate a 6-digit PIN
const generatePIN = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send reset PIN to the user
const sendResetPIN = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found with that email" });
    }

    // Generate PIN and save it in the ForgotPassword collection
    const token = generatePIN();
    const expiresAt = Date.now() + 3600000; // 1 hour expiration

    await ForgotPasswordModel.create({ email, token, expiresAt });

    // Simulate sending the PIN (you can integrate an email service later)
    console.log(`Password reset PIN sent to ${email}: ${token}`);

    return res.status(200).json({ message: "PIN sent to email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Reset password function
const resetPassword = async (req, res) => {
  const { email, pin, password } = req.body;

  try {
    // Check if the email and pin match a valid entry in ForgotPasswordModel
    const pinEntry = await ForgotPasswordModel.findOne({ email, token: pin });

    // Check if pinEntry exists and whether the pin has expired
    if (!pinEntry || pinEntry.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired PIN" });
    }

    // Find the user by email in AuthModel
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Delete the PIN entry from ForgotPasswordModel after a successful reset
    await ForgotPasswordModel.deleteOne({ email, token: pin });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { sendResetPIN, resetPassword };
