import {Router} from "express"
import { register, login, getUserProfile } from "../controllers/authController.js"
import verifyJWT from "../middlewares/authMiddleware.js"
import upload from "../middlewares/uploadMiddleware.js"
const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/profile", verifyJWT ,getUserProfile)
router.post("/upload-image", verifyJWT, upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
});
//upload.single("image"): multer middleware that handles single file under the field name "image".
//If image is uploaded, it returns the local URL for accessing it.
export default router