import Joi from 'joi';
import type { IEventCreateDto, IEventUpdateDto } from "../types/event"

export const EventCreateDto: Joi.ObjectSchema<IEventCreateDto> = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    goal_amount: Joi.number().required(),
});

export const EventUpdateDto: Joi.ObjectSchema<IEventUpdateDto> = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    goal_amount: Joi.number(),
});

export const EventFilterDto = Joi.object({
    name: Joi.string().optional(),
    id: Joi.number().min(1).optional(),
    min_amount: Joi.number().optional(),
    max_amount: Joi.number().optional(),
    transaction_id: Joi.string().optional()
});