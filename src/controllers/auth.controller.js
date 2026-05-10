import { registerService } from "../services/register.service.js";

//REGISTER CONTROLLER ***************
export const registerController = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    await registerService(name, email, password);
    res.json({
        success: true,
        message: "User Registered. Check Your Email to Verify",
    });
});