import { Router } from "express"
import { createSession, getSessionById,deleteSession,getMySessions } from "../controllers/sessionController.js"
import verifyJWT from "../middlewares/authMiddleware.js"
const router = Router()
router.post("/create", verifyJWT, createSession)
router.get("/:id", verifyJWT, getSessionById)
router.delete("/:id", verifyJWT, deleteSession)
router.get("/my-sessions", verifyJWT, getMySessions)
export default router
