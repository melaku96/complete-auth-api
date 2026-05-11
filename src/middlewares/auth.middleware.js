import userModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { catchAsync } from "../utils/catchAsync.js";
import jwt from "jsonwebtoken"

export const authMiddleware = catchAsync(async(req, res, next)=>{
  const token = req.cookies.accessToken;
  if(!token){
    throw new ApiError("Token not found", 400);
  };
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await userModel.findOne({_id:decoded._id});
  if(!user){
    throw new ApiError("User no longer exist", 404);
  }

  req.user = decoded;
  next();
});