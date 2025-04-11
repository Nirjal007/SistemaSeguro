const express = require("express");
const { register , login, sendOTP, verifyOTP} = require ("../controllers/authController");

const router = express.Router ();

router.post("/register",register); // Handles user signup
router.post("/login",login); // Handles user login

// For the purpose of the authentication
router.post("/enable-2fa", sendOTP); // Send OTP for 2FA
router.post("/verify-2fa", verifyOTP); // Verify OTP for authentication

module.exports =router;
