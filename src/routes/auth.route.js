import express from "express";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
import { forgotPasswordController, loginController, logoutController, refreshTokenController, registerController, resendVerificationController, resetPasswordController, verificationController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

//routes
router.post("/register", authLimiter, registerController);
router.post("/resend-verification", authLimiter, resendVerificationController);
router.get("/verify-email", verificationController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.patch("/reset-password/:token", resetPasswordController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutController);

export default router;