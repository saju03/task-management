import express from "express";
import dotenv from 'dotenv';
import initDB from "./Database/databaseConfig.js";
import path from "path";
import { fileURLToPath } from 'url';
import route from "./Routes/Route.js";
import adminRoute from "./Routes/AdminRoutes.js";
import { errorHandlers } from "./Middleware/ErrorHandelMilddleware.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
initDB();
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandlers);
app.use('/api', route);
app.use('/api/admin', adminRoute);
const PORT = process.env.PORT || 3000;
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => console.log(`server started http://localhost:${PORT}`));
