import express from "express";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
import { registerController, resendVerificationController, verificationController } from "../controllers/auth.controller.js";

const router = express.Router();

//routes
router.post("/register", authLimiter, registerController);
router.post("/resend-verification", authLimiter, resendVerificationController);
router.get("/verify-email", verificationController);

export default router;