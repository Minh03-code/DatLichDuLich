"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestController_1 = __importDefault(require("../controllers/TestController"));
const router = express_1.default.Router();
router.get('/test', TestController_1.default.getAllTestAPI);
router.get('/test/id/:id', TestController_1.default.getTestByIdAPI);
router.delete('/test/delete/:id', TestController_1.default.deleteTestByIdAPI);
router.post('/test/create', TestController_1.default.createDataTestAPI);
router.put('/test/update', TestController_1.default.updateDataTestAPI);
exports.default = router;
