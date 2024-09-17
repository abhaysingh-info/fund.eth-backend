import { Request, Response } from "express"
import { EventService } from "../services/event.service"
import {parse} from "dotenv";


let eventService = new EventService()

export async function EventCreate(req: Request, res: Response) {
    let body = req.body

    try {
        let user = req.user
        let event = await eventService.create(body, user);
        return res.status(201).json({ event })
    } catch (err: any) {
        return res.status(400).json({ message: err.message })
    }
}

export async function EventUpdate(req: Request, res: Response) {
    let body = req.body
    let id = parseInt(`${req.params.eventId}`)

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "invalid id" })
    }

    try {
        let user = req.user
        let event = await eventService.update(id, body, user);
        return res.status(201).json({ event })
    } catch (err: any) {
        return res.status(400).json({ message: err.message })
    }
}

export async function EventFilter(req: Request, res: Response) {
    let body = req.body
    let start: number

    if (!Number.isSafeInteger(req.query.start)) {
        start = 0
    } else {
        start = parseInt(`${req.query.start}`)
    }

    try {
        let event = await eventService.find(body, start, 20);
        return res.status(201).json({ event })
    } catch (err: any) {
        return res.status(400).json({ message: err.message })
    }
}

export async function EventOfUserFilter(req: Request, res: Response) {
    let body = req.body
    let start: number

    if (!Number.isSafeInteger(req.query.start)) {
        start = 0
    } else {
        start = parseInt(`${req.query.start}`)
    }

    try {
        let user = req.user
        let event = await eventService.find(body, start, 20, user);
        return res.status(201).json({ event })
    } catch (err: any) {
        return res.status(400).json({ message: err.message })
    }
}
