import { registerService } from "../services/register.service.js";
import { resendVerificationService } from "../services/resend.service.js";
import { verificationService } from "../services/verification.service.js";
import { catchAsync } from "../utils/catchAsync.js";

//REGISTER CONTROLLER ***************
export const registerController = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    await registerService(name, email, password);
    res.json({
        success: true,
        message: "User Registered. Check Your Email to Verify",
    });
});
//RESEND VERIFICATION CONTROLLER***********
export const resendVerificationController = catchAsync(async(req, res)=>{
    const {email} = req.body;
    await resendVerificationService(email);

    res.json({
        success: true,
        message: "Check Your Email to Verify",
    });
});
//EMAIL VERIFICATION CONTROLLER **************
export const verificationController = catchAsync(async (req, res) => {
    const { token } = req.query;
    await verificationService(token);
    res.status(200).json({
        success: true,
        message: "Email Verified Successfully!"
    });
});