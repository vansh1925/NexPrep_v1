import {User} from "../models/User.models.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/asyncHandler.js"
const generateToken=(id)=>{
    //node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" for JWT_SECRET
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}
const register = asyncHandler(async (req, res) => {
    // Register logic will go here
    try {
        const {name,email,password,profileImageUrl}=req.body
        if(!name || !email || !password){
            res.status(400).json({message:"All fields are required"})
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(400).json({message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        })
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,  
                profileImageUrl: user.profileImageUrl,
                token: generateToken(user._id)
            })
        }
    } catch (error) {
        res.status(400).json({message:"Invalid user data"})
    }
});
const login = asyncHandler(async (req, res) => {
    // Login logic will go here
    try {
        const {email,password}=req.body
        if(!email || !password){
            res.status(400).json({message:"All fields are required"})
        }
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                token: generateToken(user._id)
            })
        }
    } catch (error) {
        res.status(401).json({message:"Invalid email or password"})
    }
});
const getUserProfile = asyncHandler(async (req, res) => {
    // Get user profile logic will go here
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                token: generateToken(user._id)
            })
        }
    } catch (error) {
        res.status(404).json({message:"User not found"})
    }
});
export { register, login, getUserProfile }  