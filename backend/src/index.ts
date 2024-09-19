import express, { Application, Express } from "express";
import dotenv from 'dotenv';
import initDB from "./Database/databaseConfig.js";

initDB()
dotenv.config();
const app:Application = express()

app.use(express.json())
const PORT:string | number  = process.env.PORT || 3000


app.all('/',(req,res)=>{
    res.send('hello world')
})

app.listen(PORT,()=>console.log(`server started http://localhost:${PORT}`))