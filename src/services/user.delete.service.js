import userModel from "../models/user.model.js"
import ApiError from "../utils/ApiError.js";

export const deleteUserService = async(userId)=>{
  const user = await userModel.findOne({_id:userId});
  if(!user){
    throw new ApiError("User not found", 404);
  }
  await user.deleteOne();
};