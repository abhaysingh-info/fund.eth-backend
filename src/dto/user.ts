import Joi from "joi"
import { IUserCreate } from "../types"


export const UserCreateDto: Joi.ObjectSchema<IUserCreate> = Joi.object<IUserCreate>({
    name: Joi.string().min(2).max(64).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
})

export const UserLoginDto: Joi.ObjectSchema<IUserCreate> = Joi.object<IUserCreate>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
})