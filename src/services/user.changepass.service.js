import userModel from "../models/user.model.js"
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";

export const changePasswordService = async(userId, currentPass, newPass)=>{
  const user = await userModel.findOne({_id:userId});
  if(!user){
    throw new ApiError("User not found", 404);
  }
  const isMatch = await bcrypt.compare(currentPass, user.password);
  if(!isMatch){
    throw new ApiError("Current password is not correct", 401);
  }
  //hash new password
  const hashedNewPassword = await bcrypt.hash(newPass, 10);
  user.password = hashedNewPassword;
  await user.save();

};