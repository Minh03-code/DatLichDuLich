import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import router from './routes/Router';


dotenv.config();
const app = express();
// Cho phép sử lý dữ liệu từ form
app.use(express.urlencoded({extended: false}));
// Cho phép chuyền json qua body
app.use(express.json());

app.use('/api', router);
app.listen(process.env.PORT, () => {
    console.log(`The application is listening on port ${process.env.PORT}!`);
})