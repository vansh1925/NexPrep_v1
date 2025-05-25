import { Router } from "express";
import { register, login, getUserProfile } from "../controllers/authController.js";
import verifyJWT from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyJWT, getUserProfile);

//very very imp step yahan jab postman pe testing krega to login ya register krne ke baad jo token generate hoga use authorisation header main bearer token select krke daaliyo bina "" ke 
//and todo:- ki sir ke yt main need nhi hui iski ya hui study it imp..............
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
});

export default router;




//upload.single("image"): multer middleware that handles single file under the field name "image".
//If image is uploaded, it returns the local URL for accessing it.
