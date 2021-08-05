import joi from "joi"

export const emailSchema = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
})