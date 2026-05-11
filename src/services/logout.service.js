import userModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js"
import { cryptoHash } from "../utils/hashToken.js";

export const logoutService = async(token)=>{
  if(!token){
    throw new ApiError("No token found", 403);
  };
  const hashedToken = cryptoHash(token);
  const user = await userModel.findOne({refreshToken: hashedToken});

  if(!user){
    throw new ApiError("Invalid or expired token", 401);
  };
  user.refreshToken = null;
  await user.save();
}