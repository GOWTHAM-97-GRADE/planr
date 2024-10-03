const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];  // Get token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: "Authorization token required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token
        req.user = decoded;  // Attach user information to request
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;