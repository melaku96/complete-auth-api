import ApiError from "../utils/ApiError.js"
import userModel from "../models/user.model.js";
import crypto from "crypto"
import { cryptoHash } from "../utils/hashToken.js";

export const forgotPasswordService = async (email) => {
  if (!email) {
    throw new ApiError("Email is required", 400);
  }
  const user = await userModel.findOne({ email });
  //check is exist
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  const resetToken = crypto.randomBytes(32).toString('hex');
  //hash reset token
  const hashedResetToken = cryptoHash(resetToken);
  //update user
  user.resetToken = hashedResetToken;
  user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetURL = `http://localhost:3000/api/auth/reset-password/${resetToken}`;

  return { resetURL };
}