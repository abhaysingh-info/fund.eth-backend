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
        // event.block_number = dto.block_number;
        // event.eth_transaction_id = dto.eth_transaction_id;
        event.goal_amount = dto.goal_amount;
        event.user = user

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
        event.goal_amount = dto.goal_amount;

        try {
            await (event as any).save()
        } catch (err) {
            throw err
        }

        return event
    }

    private findQueryBuilder(filter: IEventFilterDto, user?: User) {
        let filterIsValid = EventFilterDto.validate(filter)
        if (filterIsValid.error) {
            throw filterIsValid.error
        }

        let queryBuilder = this.Model.createQueryBuilder("event").leftJoin("event.user", "user")
            .addSelect(['event.id', 'event.name', 'event.goal_amount','event.goal_achieved', 'event.eth_transaction_id', 'event.block_number', 'user.id', 'user.name', 'user.email']);

        // Filter by name (optional)
        if (filter.name) {
            queryBuilder.andWhere('event.name LIKE :name', { name: `%${filter.name}%` });
        }
        // Filter by name (optional)
        if (filter.id) {
            queryBuilder.andWhere('event.id = :id', { id: filter.id });
        }

        // Filter by goal amount range (optional)
        if (filter.min_amount && filter.max_amount) {
            queryBuilder.andWhere('event.goal_amount BETWEEN :minAmount AND :maxAmount', {
                minAmount: filter.min_amount,
                maxAmount: filter.max_amount,
            });
        } else if (filter.min_amount) {
            queryBuilder.andWhere('event.goal_amount >= :minAmount', { minAmount: filter.min_amount });
        } else if (filter.max_amount) {
            queryBuilder.andWhere('event.goal_amount <= :maxAmount', { maxAmount: filter.max_amount });
        }

        // Filter by transaction ID (optional)
        if (filter.transaction_id) {
            queryBuilder.andWhere('event.eth_transaction_id = :transactionId', { transactionId: filter.transaction_id });
        }

        // Filter by block number (optional)
        if (filter.block_number) {
            queryBuilder.andWhere('event.block_number = :blockNumber', { blockNumber: filter.block_number });
        }

        if (user != undefined) {
            queryBuilder.andWhere(`event.user.id = :userId`, { userId: user.id })
        }

        queryBuilder.orderBy("event.id", "DESC")

        return queryBuilder
    }

    async find(filter: IEventFilterDto, start: number = 0, limit: number = 15, user?: User): Promise<Event[]> {
        let events: Event[] = []

        let filterIsValid = EventFilterDto.validate(filter)
        if (filterIsValid.error) {
            throw filterIsValid.error
        }

        let queryBuilder = this.findQueryBuilder(filter, user)

        queryBuilder.skip(start).take(limit);

        try {
            events = await queryBuilder.getMany()
        } catch (err) {
            throw err
        }



        return events
    }



    async findOne(filter: IEventFilterDto, start: number = 0, limit: number = 15, user?: User): Promise<Event | null> {
        let event: Event | null

        let queryBuilder = this.findQueryBuilder(filter, user)

        try {
            event = await queryBuilder.getOne()
        } catch (err) {
            throw err
        }

        return event
    }
}