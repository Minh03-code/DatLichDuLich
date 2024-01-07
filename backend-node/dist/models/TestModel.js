"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModel = void 0;
const mysql_1 = __importDefault(require("./mysql"));
const AbstractModel_1 = __importDefault(require("./AbstractModel"));
class TestModel extends AbstractModel_1.default {
    constructor() {
        super();
    }
}
exports.TestModel = TestModel;
TestModel.layTatCa = () => {
    return new Promise((resolve, reject) => {
        mysql_1.default.query("SELECT * FROM test", (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                console.log(results);
                resolve(results);
            }
        });
    });
};
TestModel.setTableName("test");
