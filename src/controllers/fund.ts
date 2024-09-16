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

    if (isNaN(parseInt(eventId))) {
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