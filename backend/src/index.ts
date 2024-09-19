import express, { Application, Express, Request, Response } from "express";
import dotenv from 'dotenv';
import initDB from "./Database/databaseConfig.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename:string = fileURLToPath(import.meta.url);
const __dirname:string = path.dirname(__filename);
initDB()
dotenv.config();
const app:Application = express()



app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

const PORT:string | number  = process.env.PORT || 3000

app.get('*', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.listen(PORT,()=>console.log(`server started http://localhost:${PORT}`))