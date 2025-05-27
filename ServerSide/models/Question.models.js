import mongoose, { Schema } from "mongoose"
const questionSchema = new Schema({
    session: {
        type: Schema.Types.ObjectId,
        ref: "Session"
    },
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        default: ""
    }
}, { timestamps: true })
export const Question = mongoose.model("Question", questionSchema)

