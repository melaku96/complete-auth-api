import express from "express";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
import { registerController } from "../controllers/auth.controller.js";

const router = express.Router();

//routes
router.post("/register", authLimiter, registerController);

export default router;