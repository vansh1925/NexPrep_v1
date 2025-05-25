import {Session} from "../models/Session.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {Question} from "../models/Question.models.js"
const createSession=asyncHandler(async(req,res)=>{
    try{
        const {role,experience,topicsToFocus,questions,description}=req.body
        if(!role || !experience || !topicsToFocus || !questions){
            res.status(400).json({message:"All fields are required"})
        }
        const userId=req.user._id
        const session=await Session.create({
            user:userId,
            role,
            experience,
            topicsToFocus,
            questions,
            description
        })
        const questionDocs=await Promise.all(
            questions.map(async(q)=>{
                const question=await Question.create({
                    session:session._id,
                    question:q.question,
                    answer:q.answer,
                })
                return question._id;
            })
        )
        session.questions=questionDocs;
        await session.save();
        res.status(201).json({success:true,data:session})
    }catch(error){
        console.error("Error creating session:", error)
        res.status(400).json({success:false,message:error.message})
    }
})
const getSessionById=asyncHandler(async(req,res)=>{
    try{
        const session=await Session.findById(req.params.id)
        if(session){
            res.status(200).json({success:true,data:session})
        }
    }catch(error){
        console.error("Error getting session by ID:", error)
        res.status(404).json({success:false,message:error.message})
    }
})

const deleteSession=asyncHandler(async(req,res)=>{
    try{
        const session=await Session.findByIdAndDelete(req.params.id)
        if(session){
            res.status(200).json({success:true,data:session})
        }
    }catch(error){
        console.error("Error deleting session:", error)
        res.status(404).json({success:false,message:error.message})
    }   
})
const getMySessions=asyncHandler(async(req,res)=>{
    try{
        const sessions=await Session.find({user:req.user._id})
        if(sessions){
            res.status(200).json({success:true,data:sessions})
        }
    }catch(error){
        console.error("Error getting user sessions:", error)
        res.status(404).json({success:false,message:error.message})
    }
})
export {createSession,getSessionById,deleteSession,getMySessions}
