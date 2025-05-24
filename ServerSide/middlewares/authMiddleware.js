import jwt from "jsonwebtoken"
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/User.models.js"
const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.headers.authorization
        if(token && token.startsWith("Bearer ")){
            //token=token.split(" ")[1] extract token split se space delimiter hatega tp do element ki aray bani jis main se bearer that 0th and token ie 1 vala de diya
            const decodedToken=jwt.verify(token.split(" ")[1],process.env.JWT_SECRET)
            const user=await User.findById(decodedToken.id).select("-password")
            if(!user){
                return res.status(401).json({message:"Unauthorized,no token"})
            }
            req.user=user
            next()
        }
    } catch (error) {
        res.status(401).json({message:"Token failed"})
    }   
})
export default verifyJWT

    
