import Joi from 'joi';
import type { IEventCreateDto, IEventUpdateDto } from "..//types/event"

export const EventCreateDto: Joi.ObjectSchema<IEventCreateDto> = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    featuredImage: Joi.string().required(),
    blockNumber: Joi.number().required(),
    ethTransactionId: Joi.string().required(),
    goalAmount: Joi.number().required(),
});

export const EventUpdateDto: Joi.ObjectSchema<IEventUpdateDto> = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    featuredImage: Joi.string(),
    goalAmount: Joi.number(),
});

export const EventFilterDto = Joi.object({
    name: Joi.string().optional(),
    minAmount: Joi.number().optional(),
    maxAmount: Joi.number().optional(),
    transactionId: Joi.string().optional(),
    blockNumber: Joi.number().optional(),
});