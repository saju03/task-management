import express from "express";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.all('/', (req, res) => {
    res.send('hello world');
});
app.listen(PORT, () => console.log(`server started http://localhost:${PORT}`));
