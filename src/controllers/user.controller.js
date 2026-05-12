import { changePasswordService } from "../services/user.changepass.service.js";
import { deleteUserService } from "../services/user.delete.service.js";
import { getMeService } from "../services/user.get.service.js";
import { updateUserService } from "../services/user.update.service.js";
import { catchAsync } from "../utils/catchAsync.js";
import { uploadProfileService } from "../services/profile.upload.service.js";

//Get current user
export const getCurrentUserController = catchAsync(async(req, res)=>{
  const id = req.user._id;
  const {user} = await getMeService(id);

  res.status(200).json({
    success: true,
    user
  })
});
//update user
export const updateUserController = catchAsync(async(req, res)=>{
  const id = req.user._id;
  const updateData = req.body;
  const {user} = await updateUserService(id, updateData);
  res.status(200).json({
    success: true,
    user
  });
});

//change password
export const changePasswordController = catchAsync(async(req, res)=>{
  const id = req.user._id;
  const currentPassword = req.body.password;
  const newPassword = req.body.newPassword;
  await changePasswordService(id, currentPassword, newPassword);
  res.status(200).json({
    success:true,
    message: "Your password changed successfully",
  });
});
//delete user
export const deleteUserController = catchAsync(async(req, res)=>{
  const id = req.user._id;
  await deleteUserService(id);

  res.status(403).json({
    success: true,
    message: "The account deleted successfully!",
  });
});
// PROFILE UPLOAD
export const profileUploadController = catchAsync(async(req, res)=>{
    const id = req.user._id;
    const reqFile = req.file;
    const imgPath = req.file.path;

    const {user} = await uploadProfileService(id, reqFile, imgPath);
    res.status(200).json({
        success: true,
        message: 'Your profile updated successfully',
        user
    });
})