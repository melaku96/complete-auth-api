import ApiError from "../utils/ApiError.js";
import { registerJOI } from "../utils/validation.js";
import userModel from "../models/user.model.js";
import { bcryptHash, cryptoHash } from "../utils/hashToken.js";
import crypto from "crypto";
import { verifyEmailTemplate } from "../utils/emailTemplet.js";
import { sendEmail } from "../utils/sendEmail.js";


//REGISTER
export const registerService = async (name, email, password) => {
  const { error } = registerJOI.validate(
    { name, email, password },
    { abortEarly: false },
  );
  if (error) {
    const messages = error.details.map((err) => err.message);
    throw new ApiError(messages, 401);
  }
  const isExist = await userModel.findOne({ email });
  if (isExist) {
    if (!isExist.isVerified && isExist.verificationTokenExpire < Date.now()) {
      await isExist.deleteOne();
    } else {
      throw new ApiError("User already exists. Please verify your email.", 409);
    }
  }
  //hash password
  const hashed = await bcryptHash(password);
  //verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  //hash vrification token
  const hashedVerificationToken = await cryptoHash(verificationToken);

  const user = await userModel.create({
    name,
    email,
    password: hashed,
    verificationToken: hashedVerificationToken,
    verificationTokenExpire: Date.now() + 60 * 60 * 1000,
  });

  const verificationLink = `http://localhost:3000/api/auth/verify-email/${verificationToken}`;

  const htmlTemplet = verifyEmailTemplate(verificationLink);
  await sendEmail(email, "Verify Your Email", htmlTemplet);
};
