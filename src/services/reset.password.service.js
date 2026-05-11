import userModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js"
import { bcryptHash, cryptoHash } from "../utils/hashToken.js";

export const resetPasswordService = async(newPassword, token)=>{
  if(!newPassword){
    throw new ApiError("password is required", 400);
  };
  if(!tokn){
    throw new ApiError("No token found", 403);
  };
  const hashedToken = cryptoHash(token);

  const user = await userModel.findOne({
    resetToken: hashedToken,
    resetTokenExpire:{$gt: Date.now()},
  });

  if(!user){
    throw new ApiError("Invalid or expired token", 403);
  };

  const hashedPassword = await bcryptHash(newPassword, 10);
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;

  await user.save();
}