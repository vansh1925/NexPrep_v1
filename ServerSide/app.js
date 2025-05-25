import express from "express"
import cors from "cors"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

//middlewares
app.use(cors(
    {
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
))
app.use(express.json({ limit: "20kb" }))
//serve upload folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//routes
import authRouter from "./routes/auth.route.js"
import SessionRouter from "./routes/session.route.js"
// import QuestionRouter from "./routes/question.route.js"
app.use("/api/auth", authRouter)
app.use("/api/session", SessionRouter)
// app.use("/api/question", QuestionRouter)
// app.use("/api/ai/generate-question",protect, generateInterviewQuestions)
// app.use("/api/ai/generate-session",protect, generateConceptExplaination)
export { app };