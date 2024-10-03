const express = require("express");
const { signup, login, logout, editProfile, deleteAccount } = require("../Controllers/AuthController.js");
const verifyToken = require("../middlewares/authMiddleware.js"); // Middleware to check if the user is authenticated

const router = express.Router();

// Existing routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/profile", verifyToken, editProfile);
router.delete("/delete", verifyToken, deleteAccount);

module.exports = router;