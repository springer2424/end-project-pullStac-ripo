import express from 'express'
import cors from 'cors'
import { initMongoDb } from './db/dbConect.js';
import routs from "./routs/authRout.js"



const app = express();

app.use(express.json())
app.use(cors())

app.use("/admin", routs);





app.listen(5000, async ()=> {
    initMongoDb()
    console.log("this server runing on port 5000")
})