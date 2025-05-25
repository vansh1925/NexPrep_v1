import mongoose,{Schema} from "mongoose"
const sessionSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        
    },
    role:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    topicsToFocus:{
        type:String,
        required:true
    },
    questions:[{
        type:Schema.Types.ObjectId,
        ref:"Question"
    }],
    description:{
        type:String,
    },  
},{timestamps:true})
export const Session = mongoose.model("Session",sessionSchema)
