require('dotenv').config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AuthRoutes = require("./Routes/AuthRoutes");
const ForgotPasswordRoutes = require("./Routes/ForgotPasswordRoutes");  // Import Forgot Password Routes
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for PORT if available

// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000", // Allow frontend requests from localhost:3000
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    optionsSuccessStatus: 200 // For older browsers
};

app.use(cors(corsOptions)); // Applying CORS middleware with options
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/planr", { // Use environment variable for MongoDB URI
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((error) => console.log("MongoDB connection error:", error));

// Routes configuration
app.use("/", AuthRoutes);  // Existing Auth Routes
app.use("/password", ForgotPasswordRoutes);  // New Forgot Password Routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
