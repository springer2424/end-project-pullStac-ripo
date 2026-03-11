import express from 'express'
import cors from 'cors'
import { initMongoDb } from './db/dbConect.js';
import routs from "./routs/authRout.js"
import dotenv from "dotenv"
dotenv.config()



const app = express();


app.use(express.json())
app.use(cors())

app.use("/admin", routs);





app.listen(process.env.PORT, async ()=> {
    initMongoDb()
    console.log(`this server runing on port ${process.env.PORT}`)
})