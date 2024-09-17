import { FundCreateDto } from "../dto/fund";
import { Event } from "../models/event";
import { Fund } from "../models/fund";
import { User } from "../models/user";
import { IFundCreate } from "../types/fund";
import { getHash } from "../utils";
import {Web3EventFund, Web3EventUpdate} from "../web3";

export class FundService {
    Model = Fund

    async fund(body: IFundCreate, event: Event, user: User) {

        if (event.user.id == user.id) {
            throw new Error("you cannot fund your self")
        }

        let isValid = FundCreateDto.validate(body)

        if (isValid.error) {
            throw isValid.error
        }

        let fund = new this.Model()
        fund.amount = body.amount
        fund.funder = user
        fund.receiver = event.user
        fund.transaction_id = await getHash(`${new Date().getMilliseconds()}`)
        fund.sent_from = ""
        fund.block_number = 0
        fund.transaction_id = ""
        fund.date = new Date()
        fund.event = event
        // replace all blockchain related fields with actual values received from blockchain here

        try {
            (fund as any).save()
        } catch (err) {
            // log errors 
            throw err
        }

        try {
            event.goal_achieved += body.amount;
            (event as any).save()
        } catch (err) {
            // log errors
            throw err
        }

        try {
            await Web3EventFund(event.id, body.amount)
        } catch (err) {
            throw err
        }

        return fund
    }

    private findQueryBuilder(user?: User) {
        let queryBuilder = this.Model.createQueryBuilder("fund").leftJoin("fund.funder", "funder").leftJoin('fund.receiver', 'receiver').leftJoin('fund.event', 'event')
            .addSelect(['fund.id', 'fund.amount','fund.transaction_id', 'fund.block_number', 'fund.date', 'event.name', 'funder.id', 'funder.name', 'funder.email', 'receiver.id', 'receiver.name', 'receiver.email']);

        if (user != undefined) {
            // queryBuilder.andWhere(`fund.funder = :userId`, { userId: user.id })
            // queryBuilder.andWhere(`fund.receiver = :userId`, { userId: user.id })
        }

        return queryBuilder
    }

    async find(start: number = 0, limit: number = 15, user: User): Promise<Fund[]> {
        let funds: Fund[] = []

        let queryBuilder = this.findQueryBuilder(user)
        queryBuilder.skip(start).take(limit);

        try {
            funds = await queryBuilder.getMany()
        } catch (err) {
            throw err
        }

        return funds
    }

}