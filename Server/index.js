require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AuthRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;

// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000", // Allow only frontend requests from localhost:3000
    credentials: true, // Allow cookies and other credentials
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Applying CORS middleware with options
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/planr", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

// Use Auth Routes
app.use("/", AuthRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
