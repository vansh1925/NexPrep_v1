import { Router } from "express"
import { createSession, getSessionById, deleteSession, getMySessions } from "../controllers/sessionController.js"
import verifyJWT from "../middlewares/authMiddleware.js"
const router = Router()
router.post("/create", verifyJWT, createSession)
router.get("/my-sessions", verifyJWT, getMySessions)
router.get("/:id", verifyJWT, getSessionById)
router.delete("/:id", verifyJWT, deleteSession)

export default router
