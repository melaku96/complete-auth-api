import userModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";


export const uploadProfileService = async(id, reqFile, imgPath )=>{
    if(!reqFile){
        throw new ApiError('No image uploaded yet', 404);
    };
    const user = await userModel.findOne({_id:id});

    if(!user){
        throw new ApiError('User not found', 404);
    };

    user.profileImg = imgPath;
    await user.save();

    return {user};
}