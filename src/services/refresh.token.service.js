import userModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js"
import { generateToken } from "../utils/generateToken.js";
import { cryptoHash } from "../utils/hashToken.js";
import crypto from "crypto";

export const refreshTokenService = async(token)=>{
  if(!token){
    throw new ApiError("Token not found", 403);
  }
  const hashedToken = cryptoHash(token);
  const user = await userModel.findOne({refreshToken: hashedToken});
  if(!user){
    throw new ApiError("Invalid or expired token", 403);
  }
  const newAccessToken = generateToken(user);
  const newRefreshToken = crypto.randomBytes(32).toString('hex');
  const hashedNewRefreshToken = cryptoHash(newRefreshToken);

  user.refreshToken = hashedNewRefreshToken;
  await user.save();

  return {newAccessToken, newRefreshToken};
};