"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection = mysql_1.default.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'datlichdulich',
});
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err.message);
    }
    else {
        console.log('Connected to database');
    }
});
exports.default = connection;
