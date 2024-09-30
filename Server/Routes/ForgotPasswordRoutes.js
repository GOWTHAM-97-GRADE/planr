const { sendResetPIN, resetPassword } = require('../Controllers/ForgotPasswordController');
const express = require('express');
const router = express.Router();

// Publicly accessible forgot password routes (no authentication middleware)
router.post('/send-pin', sendResetPIN);
router.post('/reset-password', resetPassword);

module.exports = router;
