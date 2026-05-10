import joi from "joi";

export const registerJOI = joi.object({
    name: joi.string().required().min(2).trim(),
    email: joi.string().email().required().trim(),
    password: joi.string().required().min(4).trim(),
})