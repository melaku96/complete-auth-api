import userModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const getMeService = async(userId)=>{
  const user = await userModel.findOne({_id: userId}).select("-password");
  if(!user){
    throw new ApiError("User not found", 404);
  }
  return {user}
};