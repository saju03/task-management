import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
app.all('/', (req, res) => {
    res.send('hello world');
});
app.listen(PORT, () => console.log(`server started http://localhost:${PORT}`));
