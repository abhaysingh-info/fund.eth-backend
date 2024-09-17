import express from "express"
import {AuthenticateUser} from "../middlewares/authenticate-user";
import {FundCreate} from "../controllers/fund";

const router = express.Router()


router.post("/:eventId", AuthenticateUser, FundCreate)


export default router