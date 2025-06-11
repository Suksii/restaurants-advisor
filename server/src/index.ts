import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import connectDB from "../database/connection";

dotenv.config()

const app = express()

app.use(express())
app.use(cors({origin: process.env.CLIENT_ORIGIN, credentials: true}))
app.use(cookieParser())

connectDB()

app.get('/', async (req, res) => {
    res.status(200).json({ message: "Hello" })
})

app.listen(process.env.PORT, () => {
    try {
        console.log("Server is running on port:", process.env.PORT);
    } catch (error) {
        console.error(error);
        
    }
})