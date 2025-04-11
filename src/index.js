// Importing necessary modules
const express = require("express");  // Import Express framework
const dotenv = require("dotenv").config();  // Load environment variables from .env file
const path = require("path");
const cors = require("cors");  // Enable Cross-Origin Resource Sharing (CORS)
const dbConnect = require("./config/dbConnect");  // Import database connection function
const authRoutes = require("./routes/authRoutes");  // Import authentication routes
const orderRoutes = require("./routes/orderRoutes");  // Import the orderRoutes
// Importing the Supplier Routes
//const supplierRoutes = require('./routes/supplierRoutes'); 

//  Connect to MongoDB Database
dbConnect();  // Calls the database connection function

//  Initialize Express App
const app = express();

//  Enable CORS (Allows frontend & backend to communicate)
app.use(cors()); 

//  Middleware to parse JSON requests (Needed to handle request body data)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  // Allows form data

// Serve Static Files (For Login, Retailer, and Supplier Pages)
app.use(express.static(path.join(__dirname, "../Login")));  // Serving Login Page
app.use(express.static(path.join(__dirname, "../Retailer")));  // Serving Retailer Dashboard
app.use(express.static(path.join(__dirname, "../Supplier")));  // Serving Supplier Dashboard (if applicable)

//  Define Authentication Routes
app.use("/api/auth", authRoutes); 
// Now, all authentication-related endpoints will be accessible under `/api/auth/`

// Define Order Routes (Placed Orders, Order Status, etc.)
app.use("/api/orders", orderRoutes); 
// All order-related endpoints will be accessible under `/api/orders/`

// Use the Supplier Routes for API calls
//app.use('/api/supplier', supplierRoutes);

//  Define Port Number (Uses .env variable or defaults to 7001)
const PORT = process.env.PORT || 7001;

//  Start the Server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
