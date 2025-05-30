import { User } from "../models/User.models.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";

// Generate JWT token
const generateToken = (id) => {
    //node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" for JWT_SECRET
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ===================== REGISTER =====================
const register = asyncHandler(async (req, res) => {
    const { name, email, password, profileImageUrl } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImageUrl,
    });

    if (user) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } else {
        return res.status(400).json({ message: "Invalid user data" });
    }
});

// ===================== LOGIN =====================
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcryptjs.compare(password, user.password))) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } else {
        return res.status(401).json({ message: "Invalid email or password" });
    }
});

// ===================== PROFILE =====================
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});

export { register, login, getUserProfile };
