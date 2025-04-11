const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const User = require("../models/userModel");

// Store OTPs temporarily (consider moving to a DB)
const otpStore = {};

// Set up OAuth2 Client for Gmail
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

/**
 * Function to send OTP via email using OAuth 2.0
 */
const sendOTP = async (email) => {
    try {
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        otpStore[email] = otp; // Store OTP temporarily

        // Get access token
        const accessToken = await oauth2Client.getAccessToken();

        // Configure transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your 2FA OTP Code",
            text: `Your One-Time Password (OTP) is: ${otp}. It will expire in 5 minutes.`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error("Error sending OTP:", err);
        throw new Error("Failed to send OTP");
    }
};

/**
 * User Registration Function
 */
const register = async (req, res) => {
    try {
        const { email, password, companyName, storeName, number, selectedRole } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already registered. Please log in." });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure selectedRole is an array with one role (if it's passed as an array, take the first element)
        const role = Array.isArray(selectedRole) ? selectedRole[0] : selectedRole;

        // Create new user with selected role
        const newUser = new User({
            email,
            password: hashedPassword,
            companyName,
            storeName,
            number,
            roles: [role],  // Store only the selected role, not the entire array of roles
            twoFAEnabled: false
        });

        // Save user to database
        await newUser.save();
        res.status(201).json({ message: `User registered successfully with email: ${email}` });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

/**
 * User Login Function with 2FA OTP
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: `No account found with email ${email}` });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Return the correct role from the user document
        const role = user.roles[0];  // Since we are storing only one role, we can get the first role in the array

        // If 2FA is enabled, send OTP (if needed)
        if (user.twoFAEnabled) {
            await sendOTP(email);  // Send OTP logic here (you need the `sendOTP` function)
            return res.status(200).json({ message: "OTP sent to email. Please verify to proceed.", twoFAEnabled: true, role });
        }

        // If 2FA is not enabled, proceed to dashboard
        res.status(200).json({ message: "Login successful", twoFAEnabled: false, role });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

/**
 * Verify OTP Function for 2FA
 */
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (otpStore[email] && otpStore[email] === otp) {
            delete otpStore[email]; // Clear OTP after successful verification
            return res.status(200).json({ message: "2FA Verified Successfully!" });
        } else {
            return res.status(400).json({ message: "Invalid OTP or OTP expired" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = { register, login, sendOTP, verifyOTP };
