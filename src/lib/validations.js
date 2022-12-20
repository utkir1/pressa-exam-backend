import Joi from "joi";

const loginScheme = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});


const registerScheme = Joi.object({
  username: Joi.string().min(3).max(25).required(),
  password: Joi.string().min(8).required(),
});


export { loginScheme, registerScheme };
