import { connectDB } from "./models"
import "reflect-metadata"
import express from "express"
import { configDotenv } from "dotenv"
import { User } from "./models/user"
import { AttachUser } from "./middlewares/attach-user"
const cors = require("cors")

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
app.use(cors())
app.use(AttachUser)





app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running -> http://0.0.0.0:${process.env.PORT || 4000}/`)
})