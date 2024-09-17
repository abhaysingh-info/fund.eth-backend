import { connectDB } from "./models"
import "reflect-metadata"
import express from "express"
import { configDotenv } from "dotenv"
import { User } from "./models/user"
import { AttachUser } from "./middlewares/authorize-user"
import UserRoutes from "./routes/user.routes"
import EventRoutes from "./routes/event.routes";
import FundRoutes from "./routes/fund.routes";

const cors = require("cors")
const cookieSession = require("cookie-parser")


configDotenv()
connectDB()

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

const app = express()

app.use(express.json())
app.use(cookieSession({ httpOnly: true }))

var whitelist = `${process.env.CORS_URLS}`?.split(",")

var corsOptions = {
    origin: function (origin: string, callback: Function) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}

app.use(cors(corsOptions))


app.use("/user", UserRoutes)
app.use("/event", AttachUser, EventRoutes)
app.use("/fund", AttachUser, FundRoutes)

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running -> http://0.0.0.0:${process.env.PORT || 4000}/`)
})