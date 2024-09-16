import Joi from "joi";

export const FundCreateDto = Joi.object({
    amount: Joi.number().required().min(10),
});