import express from "express";
import AuthController from "../controllers/authControler.js";  
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const authController = new AuthController();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/profile", authMiddleware, authController.getProfile.bind(authController));
router.patch("/profile", authMiddleware, authController.updateProfile.bind(authController));

export default router;

