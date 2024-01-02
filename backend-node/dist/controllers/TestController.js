"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const TestModel_1 = require("../models/TestModel");
class TestController {
}
_a = TestController;
TestController.getAllTestAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield TestModel_1.TestModel.all();
        return res.send({
            message: "Lấy dữ liệu thành công",
            code: 200,
            result: data
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            message: "Lỗi khi lấy dữ liệu",
            code: 500,
            error: error
        });
    }
});
TestController.getTestByIdAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield TestModel_1.TestModel.get(["id"], [parseInt(req.params.id)]);
        return res.send({
            message: "Lấy dữ liệu thành công",
            code: 200,
            result: data
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            message: "Lỗi khi lấy dữ liệu",
            code: 500,
            error: error
        });
    }
});
TestController.deleteTestByIdAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield TestModel_1.TestModel.delete(parseInt(req.params.id));
        return res.send({
            message: "Xóa thành công",
            code: 200,
            result: data
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            message: "Lỗi khi xóa dữ liệu",
            code: 500,
            error: error
        });
    }
});
TestController.createDataTestAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield TestModel_1.TestModel.insert("string, number", [req.body.string, req.body.number]);
        return res.send({
            message: "Thêm thành công",
            code: 200,
            result: data
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            message: "Lỗi khi thêm dữ liệu",
            code: 500,
            error: error
        });
    }
});
TestController.updateDataTestAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield TestModel_1.TestModel.update(["string", "number"], [req.body.string, req.body.number], ["id"], [req.body.id]);
        return res.send({
            message: "Cập nhập thành công",
            code: 200,
            result: data
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            message: "Lỗi khi cập nhập dữ liệu",
            code: 500,
            error: error
        });
    }
});
exports.default = TestController;
