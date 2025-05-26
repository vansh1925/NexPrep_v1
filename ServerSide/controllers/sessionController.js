import { Session } from "../models/Session.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Question } from "../models/Question.models.js"
import mongoose from "mongoose"
const createSession = asyncHandler(async (req, res) => {
    try {
        const { role, experience, topicsToFocus, questions, description } = req.body
        if (!role || !experience || !topicsToFocus || !questions) {
            res.status(400).json({ message: "All fields are required" })
        }
        const userId = req.user._id
        const session = await Session.create({
            userId: new mongoose.Types.ObjectId(req.user._id),
            role,
            experience,
            topicsToFocus,
            questions: [],
            /*  why empty ->Client questions ko ek array of objects ke form mein bhejta hai, jisme har object mein question aur answer hota hai.
                Lekin Session model mein questions field ObjectId references ka array hota hai, na ki direct objects.
                Isliye backend ko har question object ke liye alag se Question document create karna hota hai.
                Fir un Question documents ke ObjectId lekar Session ke questions field mein save karne hote hain.
                Isse data sahi tarike se organize hota hai, aur alag alag questions ko alag manage karna easy ho jata hai.
*/
            description
        })
        // a new approach to read kriyo isko exp below
        /* questions.map(...) means hum har question object ko leke uske liye ek async function chala rahe hain, jo database mein ek naya Question document create karta hai.
            Har Question.create() ek promise return karta hai kyunki database operation asynchronous hota hai.
            Promise.all(...) ek array of promises leta hai (yahan har question ka creation promise) aur wait karta hai sabhi promises complete hone tak.
            Jab sab questions save ho jate hain, to Promise.all unke results (yahan har question ka _id) ko ek array mein return karta hai.
            Yeh approach asynchronous operations ko efficiently parallel chalane ke liye hota hai — ek ek karke nahi, saath saath.
*/
        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                })
                return question._id;
            })
        )
        session.questions = questionDocs;
        await session.save();
        res.status(201).json({ success: true, data: session })
    } catch (error) {
        console.error("Error creating session:", error)
        res.status(400).json({ success: false, message: error.message })
    }
})
const getSessionById = asyncHandler(async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: "questions",
                options: { sort: { createdAt: -1, isPinned: -1 } },
            })
            .exec();


        if (session) {
            res.status(200).json({ success: true, data: session })
        }
    } catch (error) {
        console.error("Error getting session by ID:", error)
        res.status(404).json({ success: false, message: error.message })
    }
})

const deleteSession = asyncHandler(async (req, res) => {
    try {

        const session = await Session.findById(req.params.id)
        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" })
        }

        if (session.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this session" })
        }
        //first Delete associated questions
        await Question.deleteMany({ session: req.params.id });
        //then delete the session
        await Session.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Session deleted successfully" })
    } catch (error) {
        console.error("Error deleting session:", error)
        res.status(500).json({ success: false, message: error.message })
    }
}
)
const getMySessions = asyncHandler(async (req, res) => {
    try {
        console.log("Fetching sessions for user:", req.user._id);
        const sessions = await Session.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .populate("questions")

        if (sessions) {
            res.status(200).json({ success: true, data: sessions })
        }
    } catch (error) {
        console.error("Error getting user sessions:", error)
        res.status(404).json({ success: false, message: error.message })
    }
})
export { createSession, getSessionById, deleteSession, getMySessions }
/*
1. findById vs find
findById(id):
Takes an ID string directly
Returns a single document or null
Specifically searches by _id field
Shorthand for find({ _id: id }).limit(1)

find({ criteria }): does exact match
Takes a filter object with any field criteria
Returns an array of documents (even if just one match)
Can search by any combination of fields
Returns empty array [] when no matches

2. When to Use Each Method

Use findById() for:
getSessionById & deleteSession - because you need exactly one specific session with a known ID

// sirf vo particular session chahiye hota hai, jo ID (session ki id) se identify hota hai

Operations targeted at a specific document
When you have the document's unique identifier

Use find() for:
getMySessions - because you need all sessions matching a user ID

//to jahan bhi vo user tha ie us user ke jitne bhi sessions the vo sab dedo

Fetching multiple documents
When filtering by criteria other than just ID
When you need to apply additional filters/sorting

3. Why getSessionById Fails After Deletion
getSessionById fails because:

Once a session is deleted, findById() returns null
Your code only handles the case when session exists: if (session) {...}
No response is sent when session is null
The function continues but never sends a response

getMySessions works because:

find() returns an empty array [] when no sessions match
Empty array is a valid result that passes the if (sessions) check
Response is properly sent with the empty array
*/