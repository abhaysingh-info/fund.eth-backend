import { FundCreateDto } from "../dto/fund";
import { Event } from "../models/event";
import { Fund } from "../models/fund";
import { User } from "../models/user";
import { IFundCreate } from "../types/fund";
import { getHash } from "../utils";

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

        // replace all blockchain related fields with actual values received from blockchain here

        try {
            (fund as any).save()
        } catch (err) {
            // log errors 
            throw err
        }

        return fund
    }

}