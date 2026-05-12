import express from "express";
import { changePasswordController, deleteUserController, getCurrentUserController, profileUploadController, updateUserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

//routes
router.get('/me', authMiddleware, getCurrentUserController);
router.patch('/me', authMiddleware, updateUserController);
router.patch('/change-password', authMiddleware, changePasswordController);
router.delete('/delete-user', authMiddleware, deleteUserController);
router.patch("/upload-profile", authMiddleware, upload.single('profile'), profileUploadController);

export default router;