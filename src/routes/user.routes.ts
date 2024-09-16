import express from "express"
import { UserCreate, UserLogin, UserLogout, UserVerifySession } from "../controllers/user"
import { AuthenticateUser } from "../middlewares/authenticate-user"


const router = express.Router()


router.post("/", UserCreate)
router.post("/login", UserLogin)
router.get("/login/verify", AuthenticateUser, UserVerifySession)
router.get("/logout", AuthenticateUser, UserLogout)


export default router