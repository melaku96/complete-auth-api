import { getMeService } from "../services/user.get.service.js";
import { catchAsync } from "../utils/catchAsync.js";


export const getCurrentUserController = catchAsync(async(req, res)=>{
  const id = req.user._id;
  const {user} = await getMeService(id);

  res.status(200).json({
    success: true,
    user
  })
});