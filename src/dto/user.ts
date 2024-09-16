import Joi from "joi"
import { IUserCreate } from "../types"


export const UserCreateDto: Joi.ObjectSchema<IUserCreate> = Joi.object<IUserCreate>({
    name: Joi.string().min(2).max(64),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(128),
})

export const UserLoginDto: Joi.ObjectSchema<IUserCreate> = Joi.object<IUserCreate>({
    name: Joi.string().min(2).max(64),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(128),
})