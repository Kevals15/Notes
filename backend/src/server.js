import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import noteRouter from './routes/notes.routes.js'
import connectDb from './db/index.js'
const app = express()
dotenv.config()
connectDb()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(` Server listening at port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(`DB CONNECTION FAILED ${err}`);
    })
app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use("/api/notes", noteRouter)