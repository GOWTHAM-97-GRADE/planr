const { sendResetPIN, resetPassword } = require('../Controllers/ForgotPasswordController');
const express = require('express');
const router = express.Router();

router.post('/send-pin', sendResetPIN);
router.post('/reset-password', resetPassword);

module.exports = router;
