import ApiError from "../utils/ApiError.js";
import userModel from "../models/user.model.js";
import { cryptoHash } from "../utils/hashToken.js";
import crypto from "crypto";
import { verifyEmailTemplate } from "../utils/emailTemplet.js";
import { sendEmail } from "../utils/sendEmail.js";


export const resendVerificationService = async(email)=>{
    if(!email){
        throw new ApiError('Email is required', 400);
    };
    const user = await userModel.findOne({email});
    if(!user){
        throw new ApiError('User not found. Please register again', 404);
    }
    //create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    //hash the token to store fron DB and for security
    const hashedVerificationToken = cryptoHash(verificationToken);
    //update user
    user.verificationToken = hashedVerificationToken;
    user.verificationTokenExpire = Date.now()+60*60*1000;
    await user.save();

    const verificationURL = `http://localhost:3000/api/auth/verify-email${verificationToken}`;

    const htmlTemplate = verifyEmailTemplate(verificationURL);

    await sendEmail(
        email,
        'Verify Your Email',
        htmlTemplate
    );
}