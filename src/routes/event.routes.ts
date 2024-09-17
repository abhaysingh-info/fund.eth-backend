import express from "express"
import { EventCreate, EventFilter, EventOfUserFilter, EventUpdate } from "../controllers/event"
import {AuthenticateUser} from "../middlewares/authenticate-user";


const router = express.Router()


router.post("/", AuthenticateUser, EventCreate)
router.post("/filter", EventFilter)
router.get("/user", AuthenticateUser, EventOfUserFilter)
router.patch("/:eventId", AuthenticateUser, EventUpdate)

export default router