import express, { Application, Express } from "express";

const app:Application = express()


const PORT:string | number  = process.env.PORT || 3000


app.all('/',(req,res)=>{
    res.send('hello world')
})

app.listen(PORT,()=>console.log(`server started http://localhost:${PORT}`))