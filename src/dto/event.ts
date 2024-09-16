import Joi from 'joi';
import type { IEventCreateDto, IEventUpdateDto } from "..//types/event"

export const EventCreateDto: Joi.ObjectSchema<IEventCreateDto> = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    featured_image: Joi.string().required(),
    block_number: Joi.number().required(),
    eth_transaction_id: Joi.string().required(),
    goal_amount: Joi.number().required(),
});

export const EventUpdateDto: Joi.ObjectSchema<IEventUpdateDto> = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    featured_image: Joi.string(),
    goal_amount: Joi.number(),
});

export const EventFilterDto = Joi.object({
    name: Joi.string().optional(),
    min_amount: Joi.number().optional(),
    max_amount: Joi.number().optional(),
    transaction_id: Joi.string().optional(),
    block_number: Joi.number().optional(),
});