import userModel from "../models/user.model.js"
import ApiError from "../utils/ApiError.js";

export const updateUserService = async(userId, updateData)=>{
  const forbiddenFields = ["password", "refreshToken", "isVerified"];

  forbiddenFields.forEach(field=> {
    delete updateData[field];
  });
  const user = await userModel.findOneAndUpdate(
    {_id: userId},
    updateData,
    {returnDocument: "after"}
  );
  if(!user){
    throw new ApiError("User not found", 404);
  };
  return {user};
};