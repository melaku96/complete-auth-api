import { loginService } from "../services/login.service.js";
import { registerService } from "../services/register.service.js";
import { resendVerificationService } from "../services/resend.verification.service.js";
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
export const resendVerificationController = catchAsync(async (req, res) => {
    const { email } = req.body;
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
//USER LOGIN CONTROLLER ****************
export const loginController = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await loginService(email, password);
    //set cookies
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        success: true,
        message: 'Login Successfully!',
        user
    });
});