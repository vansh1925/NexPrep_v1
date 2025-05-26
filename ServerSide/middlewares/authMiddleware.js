import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.models.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            const token = authHeader.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decodedToken.id).select("-password");

            if (!user) {
                return res.status(401).json({ message: "Unauthorized: User not found" });
            }

            req.user = user;
            console.log("User set in req.user:", req.user._id);
            next();
        } catch (error) {
            console.error("JWT verification failed:", error.message);
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        return res.status(401).json({ message: "No token provided or format invalid" });
    }
});

export default verifyJWT;
