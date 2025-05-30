import { Router } from "express"
import { togglePinQuestion, updateQuestionNote, addQuestionsToSession } from "../controllers/questionController.js"
import verifyJWT from "../middlewares/authMiddleware.js"
const router = Router()
router.post("/add", verifyJWT, addQuestionsToSession)
router.put("/:id/pin", verifyJWT, togglePinQuestion)
router.get("/:id/note", verifyJWT, updateQuestionNote)


export default router
