import ApiError from "../utils/ApiError.js";
import userModel from "../models/user.model.js";
import { cryptoHash } from "../utils/hashToken.js";


//EMAIL VERIFICATION SERVICE ******************
export const verificationService = async(token)=>{

    if(!token){
        throw new ApiError('No token found', 403);
    };
    //hash the token params
    const hashedVerificationToken = await cryptoHash(token);
    //find user by token
    const user = await userModel.findOne({
        verificationToken: hashedVerificationToken,
        verificationTokenExpire:{$gt: Date.now()},
    });
    
    if(!user){
        throw new ApiError('Invalid or expired token', 403);
    }
    //update user
    user.isVerified = true;
    user.verificationToken=undefined;
    user.verificationTokenExpire=undefined;

    await user.save();
};