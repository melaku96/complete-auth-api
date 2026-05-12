import userModel from "../models/user.model.js"

export const updateUserService = async(userId, updateData)=>{
  const forbiddenFields = ["password", "refreshToken", "isVerified"];

  forbiddenFields.forEach(field=> {
    delete updateData[field];
  });
  const user = await userModel.findOne(
    {_id: userId},
    updateData,
    {returnDocument: "after"}
  );
};