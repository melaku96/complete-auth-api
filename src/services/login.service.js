import ApiError from "../utils/ApiError.js"
import userModel from "../models/user.model.js";
import { comparePassword } from "../utils/comparePass.js";
import { generateToken } from "../utils/generateToken.js";
import crypto from "crypto";
import { cryptoHash } from "../utils/hashToken.js";

export const loginService = async(email, password)=>{
  if(!email || !password){
    throw new ApiError("Email and password are required", 400);
  }
  const user = await userModel.findOne({email});
  if(!user){
    throw new ApiError("User is not found", 404);
  }
  if(user.isVerified && user.verificationTokenExpire > Date.now()){
    throw new ApiError("Please verify your email", 400);
  }
  if(user.isVerified && user.verificationTokenExpire < Date.now()){
    await user.deleteOne();
    throw new ApiError("Verification time expired. Please register again and verify your email", 400);
  };
  const isMatch = await comparePassword(password, user.password);
  if(!isMatch){
    throw new ApiError("Invalid password", 400);
  };

  const accessToken = generateToken(user);
  const refreshToken = crypto.randomBytes(32).toString("hex");
  const hashedRefreshToken = cryptoHash(refreshToken);

  user.refreshToken = hashedRefreshToken;
  await user.save();

  return {accessToken, refreshToken, user};
};