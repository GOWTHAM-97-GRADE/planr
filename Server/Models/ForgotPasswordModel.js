const mongoose = require('mongoose');

const ForgotPasswordSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ForgotPassword', ForgotPasswordSchema);
