import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB connection error", error)
    }
}
export default connectDB