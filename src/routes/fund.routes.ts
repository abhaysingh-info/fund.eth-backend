import express from "express"
import {AuthenticateUser} from "../middlewares/authenticate-user";
import {FundCreate, FundFilter} from "../controllers/fund";

const router = express.Router()


router.post("/", AuthenticateUser, FundFilter)
router.post("/:eventId", AuthenticateUser, FundCreate)


export default router