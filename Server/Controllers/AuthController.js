const AuthModel = require("../Models/AuthModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '15d',
    });
};

const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    
    // Check if any fields are missing
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await AuthModel.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ message: "User already exists with this email address" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await AuthModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id);
        res.cookie('e-comToken', token, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        });

        if (newUser) {
            return res.status(201).json({
                name: newUser.name,
                email: newUser.email,
                _id: newUser._id,
                token: token,
            });
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await AuthModel.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ message: "No such User Exists" });
        }

        const checkPassword = await bcrypt.compare(password, existingUser.password);

        if (!checkPassword) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = generateToken(existingUser._id);
        res.cookie("e-comToken", token, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            existingUser,
            token: token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("e-comToken");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const editProfile = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await AuthModel.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: "No such user exists" });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            },
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { login, signup, logout, editProfile };
