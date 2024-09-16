import express from "express"
import { EventCreate, EventFilter, EventOfUserFilter, EventUpdate } from "../controllers/event"


const router = express.Router()


router.post("/", EventCreate)
router.get("/", EventFilter)
router.get("/user", EventOfUserFilter)
router.patch("/:eventId", EventUpdate)

export default router