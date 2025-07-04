import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import noteRouter from './routes/notes.routes.js'
import connectDb from './db/index.js'
import path from 'path'
dotenv.config()
const app = express()
const __dirname = path.resolve()



app.use(express.json())

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: process.env.CORS_ORIGIN
    }))
}

app.use("/api/notes", noteRouter)



if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })

}
connectDb()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(` Server listening at port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(`DB CONNECTION FAILED ${err}`);
    })
