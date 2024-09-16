import { QueryBuilder } from "typeorm"
import { EventCreateDto, EventFilterDto, EventUpdateDto } from "../dto/event"
import { Event } from "../models/event"
import { User } from "../models/user"
import { IEventCreateDto, IEventFilterDto, IEventUpdateDto } from "../types/event"

export class EventService {
    Model = Event

    async create(dto: IEventCreateDto, user: User): Promise<Event> {
        let isValid = EventCreateDto.validate(dto)

        if (isValid.error) {
            throw isValid.error
        }

        let event = new Event()

        event.name = dto.name;
        event.description = dto.description;
        event.featuredImage = dto.featuredImage;
        event.blockNumber = dto.blockNumber;
        event.ethTransactionId = dto.ethTransactionId;
        event.goalAmount = dto.goalAmount;

        try {
            (event as any).save()
        } catch (err) {
            throw err
        }

        return event
    }

    async update(updateId: number, dto: IEventUpdateDto, user: User): Promise<Event> {
        let isValid = EventUpdateDto.validate(dto)

        if (isValid.error) {
            throw isValid.error
        }

        let event: Event | null

        try {
            event = await Event.findOneBy({ id: updateId })
        } catch (err) {
            throw err
        }

        if (!event) {
            throw new Error(`event '${updateId}' does not exists!`)
        }

        if (event.user.id != user.id) {
            throw new Error(`you are not authorized to access this resource`)
        }

        event.name = dto.name;
        event.description = dto.description;
        event.featuredImage = dto.featuredImage;
        event.goalAmount = dto.goalAmount;

        try {
            await (event as any).save()
        } catch (err) {
            throw err
        }

        return event
    }

    async find(filter: IEventFilterDto, start: number = 0, limit: number = 15, user?: User): Promise<Event[]> {
        let events: Event[] = []

        let filterIsValid = EventFilterDto.validate(filter)
        if (filterIsValid.error) {
            throw filterIsValid.error
        }

        let queryBuilder = this.Model.createQueryBuilder()

        // Filter by name (optional)
        if (filter.name) {
            queryBuilder.andWhere('event.name LIKE :name', { name: `%${filter.name}%` });
        }

        // Filter by goal amount range (optional)
        if (filter.minAmount && filter.maxAmount) {
            queryBuilder.andWhere('event.goalAmount BETWEEN :minAmount AND :maxAmount', {
                minAmount: filter.minAmount,
                maxAmount: filter.maxAmount,
            });
        } else if (filter.minAmount) {
            queryBuilder.andWhere('event.goalAmount >= :minAmount', { minAmount: filter.minAmount });
        } else if (filter.maxAmount) {
            queryBuilder.andWhere('event.goalAmount <= :maxAmount', { maxAmount: filter.maxAmount });
        }

        // Filter by transaction ID (optional)
        if (filter.transactionId) {
            queryBuilder.andWhere('event.ethTransactionId = :transactionId', { transactionId: filter.transactionId });
        }

        // Filter by block number (optional)
        if (filter.blockNumber) {
            queryBuilder.andWhere('event.blockNumber = :blockNumber', { blockNumber: filter.blockNumber });
        }

        if (user != undefined) {
            queryBuilder.andWhere(`event.user.id = :userId`, { userId: user.id })
        }

        queryBuilder.skip(start).take(limit);

        try {
            events = await queryBuilder.getMany()
        } catch (err) {
            throw err
        }

        return events
    }
}