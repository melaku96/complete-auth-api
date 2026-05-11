import express from "express";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
import { forgotPasswordController, loginController, registerController, resendVerificationController, resetPasswordController, verificationController } from "../controllers/auth.controller.js";

const router = express.Router();

//routes
router.post("/register", authLimiter, registerController);
router.post("/resend-verification", authLimiter, resendVerificationController);
router.get("/verify-email", verificationController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.patch("/reset-password/:token", resetPasswordController);

export default router;