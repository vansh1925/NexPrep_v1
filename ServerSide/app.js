import express from "express"
import cors from "cors"


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
app.use(express.json())
//serve upload folders
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}))