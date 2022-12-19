import Joi from "joi";

export const LoginValidate = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(6)
    .max(250)
    .required(),

    password: Joi.string()
    .min(6)
    .max(250)
    .required()
});

export const RefreshTokenValidate = Joi.object({
    refreshToken: Joi.string().required(),
});