import express from "express"
import { UserCreate, UserLogin, UserLogout, UserVerifySession } from "../controllers/user"
import { AuthenticateUser } from "../middlewares/authenticate-user"
import {AttachUser} from "../middlewares/authorize-user";


const router = express.Router()


router.post("/", UserCreate)
router.post("/login", UserLogin)
router.get("/login/verify", AttachUser, AuthenticateUser, UserVerifySession)
router.get("/logout", AttachUser, AuthenticateUser, UserLogout)


export default router