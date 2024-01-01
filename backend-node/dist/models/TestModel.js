"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTest = void 0;
const mysql_1 = __importDefault(require("./mysql"));
const getAllTest = () => {
    return new Promise((resolve, reject) => {
        mysql_1.default.query('SELECT * FROM test', (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(results);
            }
        });
    });
};
exports.getAllTest = getAllTest;
