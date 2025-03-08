import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import fileUpload from "express-fileupload"

import authRouter from "./routes/auth.js"
import postRoute from "./routes/posts.js"
import commentRoute from "./routes/comment.js"


const app = express()
dotenv.config()

//constants
const PORT = process.env.PORT || 3001
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_USER = process.env.DB_USER
const DB_NAME = process.env.DB_NAME

//middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
// http://localhost:3003
app.use('/api/auth', authRouter)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

async function start() {
    try{
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.aeqnx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
            )

            app.listen(PORT, console.log(`s started on port: ${PORT}`))
    } catch(error) {
        console.log(error);
        
    }
}

start()