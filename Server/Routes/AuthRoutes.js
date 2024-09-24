const { signup, login, logout,editProfile } = require("../Controllers/AuthController.js");
const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",verifyToken,logout);
router.post("/profile",verifyToken,editProfile);

module.exports = router;