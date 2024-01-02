"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datlichdulich',
});
connection.connect((err) => {
    if (err) {
        console.error('Kết nối database thất bại: ', err.message);
    }
    else {
        console.log('Kết nối database thành công');
    }
});
exports.default = connection;
