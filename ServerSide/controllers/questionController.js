import { Question } from "../models/Question.models.js";
import { Session } from "../models/Session.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const addQuestionsToSession = asyncHandler(async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid input data" });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }
        //create new questions
        const createdQuestions = await Question.insertMany(questions.map(q => ({
            session: sessionId,
            question: q.question,
            answer: q.answer,
        })));
        //update session with new questions
        session.questions.push(...createdQuestions.map(q => q._id));
        await session.save();

        res.status(200).json({ success: true, data: session });
    } catch (error) {
        console.error("Error adding questions to session:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})
const togglePinQuestion = asyncHandler(async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }
        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        console.error("Error toggling pin status:", error);
        res.status(500).json({ success: false, message: error.message });
    }
})
const updateQuestionNote = asyncHandler(async (req, res) => {
    try {
        const { note } = req.body;
        const questionId = req.params.id;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }
        //this will add a new field in question as note ki user ne note add kr diya prep krte krte
        question.note = note || "";
        await question.save();

        res.status(200).json({ success: true, data: question });
    } catch (error) {
        console.error("Error updating question note:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});
export { addQuestionsToSession, togglePinQuestion, updateQuestionNote };