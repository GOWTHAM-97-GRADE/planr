const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()
const verifyToken = (req, res, next) => {
    const token = req.cookies["e-comToken"];
    if (!token) {
        return res.status(403).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
