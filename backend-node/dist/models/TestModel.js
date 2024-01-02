"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModel = void 0;
const AbstractModel_1 = __importDefault(require("./AbstractModel"));
class TestModel extends AbstractModel_1.default {
    constructor() {
        super();
    }
}
exports.TestModel = TestModel;
TestModel.setTableName("test");
