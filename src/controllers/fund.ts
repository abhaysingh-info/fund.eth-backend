import { Event } from "../models/event";
import { EventService } from "../services/event.service";
import { FundService } from "../services/fund.service";
import { Request, Response } from "express"


const fundService = new FundService()
const eventService = new EventService()

export async function FundCreate(req: Request, res: Response) {
    let body = req.body
    let eventId = `${req.params.eventId}`
    let user = req.user

    if (!Number.isSafeInteger(req.params.eventId)) {
        res.status(400).json({ message: `invalid event id` })
    }

    let event: Event | null
    try {
        event = await eventService.findOne({ id: parseInt(eventId) })
    } catch (err: any) {
        res.status(400).json({ message: err.message })
        return
    }

    if (!event) {
        res.status(404).json({ message: `event not found` })
        return
    }
    try {
        let fund = await fundService.fund(body, event, user)
        res.status(201).json({ fund })
        return
    } catch (err: any) {
        res.status(400).json({ message: err.message })
        return
    }

}

export async function FundFilter(req: Request, res: Response) {
    let start: number

    if (!Number.isSafeInteger(req.query.start)) {
        start = 0
    } else {
        start = parseInt(`${req.query.start}`)
    }

    try {
        let user = req.user
        let event = await fundService.find(start, 20, user);
        return res.status(200).json({ event })
    } catch (err: any) {
        return res.status(400).json({ message: err.message })
    }
}