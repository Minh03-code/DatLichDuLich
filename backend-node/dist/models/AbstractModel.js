"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("./mysql"));
class AbstractModel {
    // sét tên bảng cho từng model
    static setTableName(tableName) {
        _a.tableName = tableName;
    }
}
_a = AbstractModel;
//////////////////////////////////////////////////////////////////////////////////
// 1 lấy dữ liệu
//////////////////////////////////////////////////////////////////////////////////
// 1.1 lấy tất cả dữ liệu của bảng
AbstractModel.all = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${_a.tableName}`;
        const query = mysql_1.default.query(sql, (err, result) => {
            if (err) {
                console.log("Xuất lỗi" + err);
                reject(err);
            }
            else {
                console.log(`Lấy thành công tất cả dữ liệu trong bảng ${_a.tableName}`);
                resolve(result);
            }
        });
    });
};
// 1.2 lấy dữ liệu theo id
AbstractModel.find = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${_a.tableName} WHERE id = ?`;
        const sqlValueCondition = [id];
        const query = mysql_1.default.query(sql, sqlValueCondition, (err, result) => {
            if (err) {
                console.log("Xuất lỗi" + err);
                reject(err);
            }
            else {
                console.log(`Lấy thành công item có id là ${id} trong bảng ${_a.tableName}`);
                resolve(result[0]);
            }
        });
    });
};
// 1.3 lấy dữ liệu theo điều kiện cụ thể (mảng điều kiện kiểu string, mảng dữ liệu điều kiện kiểu any)
// NOTE: đây là hàm chưa được kiểm chứng nhưng khả năng đúng 100%
AbstractModel.getAnd = (sqlKeyCondition, sqlValueCondition) => {
    const getwhereAnd = _a.whereAnd(sqlKeyCondition);
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${_a.tableName} WHERE ${getwhereAnd}`;
        const query = mysql_1.default.query(sql, sqlValueCondition, (err, result) => {
            if (err) {
                console.log("Xuất lỗi" + err);
                reject(err);
            }
            else {
                console.log(`Lấy thành công tất cả dữ liệu trong bảng ${_a.tableName}`);
                resolve(result);
            }
        });
    });
};
//////////////////////////////////////////////////////////////////////////////////
// 2 xóa dữ liệu
//////////////////////////////////////////////////////////////////////////////////
// 2.1 Xóa dữ liệu theo id
AbstractModel.delete = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM ${_a.tableName} WHERE id = ?`;
        const sqlValueCondition = [id];
        const query = mysql_1.default.query(sql, sqlValueCondition, (err, result) => {
            if (err) {
                console.log("Xuất lỗi" + err);
                reject(err);
            }
            else {
                console.log(`Xóa thành công item có id là ${id} trong bảng ${_a.tableName}`);
                resolve(result);
            }
        });
    });
};
// 2.2 Xóa dữ liệu theo điều kiện cụ thể
// NOTE: đây là hàm chưa được kiểm chứng nhưng khả năng đúng 100%
AbstractModel.deleteCondition = (sqlKeyCondition, sqlValueCondition) => {
    const deleteCondition = _a.whereAnd(sqlKeyCondition);
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM ${_a.tableName} WHERE ${deleteCondition}`;
        const query = mysql_1.default.query(sql, sqlValueCondition, (err, result) => {
            if (err) {
                console.log("Xuất lỗi" + err);
                reject(err);
            }
            else {
                console.log(`Xóa thành công item trong bảng ${_a.tableName} theo điều kiện`);
                resolve(result);
            }
        });
    });
};
//////////////////////////////////////////////////////////////////////////////////
// 3 thêm dữ liêu
//////////////////////////////////////////////////////////////////////////////////
// 3.1 Thêm dữ liệu
AbstractModel.insert = (sqlKeyCreate, sqlValueCreate) => {
    const questionMarks = sqlValueCreate.map(() => '?').join(',');
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO ${_a.tableName} (${sqlKeyCreate}) VALUES (${questionMarks})`;
        const query = mysql_1.default.query(sql, sqlValueCreate, (err, result) => {
            if (err) {
                console.log("Xuất lỗi" + err);
                reject(err);
            }
            else {
                console.log(`Thêm dữ liêu vào bảng ${_a.tableName} thành công`);
                resolve(result);
            }
        });
    });
};
//////////////////////////////////////////////////////////////////////////////////
// 4 Cập nhật dữ liệu
//////////////////////////////////////////////////////////////////////////////////
// 4.1 Cập nhật dữ liệu
AbstractModel.update = (sqlKeyUpdate, sqlValueUpdate, sqlKeyCondition, sqlValueCondition) => {
    const columnUpdates = sqlKeyUpdate.map(type => `${type}=?`).join(', '); // Ví dụ column1=?, column2=?
    const updatewhereAnd = _a.whereAnd(sqlKeyCondition);
    const valueQuestionMakes = sqlValueUpdate.concat(sqlValueCondition);
    return new Promise((resolve, reject) => {
        const sql = `UPDATE ${_a.tableName} SET ${columnUpdates} WHERE ${updatewhereAnd}`;
        const query = mysql_1.default.query(sql, valueQuestionMakes, (err, result) => {
            if (err) {
                console.log("Xuất lỗi" + err);
                reject(err);
            }
            else {
                console.log(`Cập nhật dữ liêu vào bảng ${_a.tableName} thành công`);
                resolve(result);
            }
        });
    });
};
//////////////////////////////////////////////////////////////////////////////////
// 5 Hàm hỗ trợ
//////////////////////////////////////////////////////////////////////////////////
AbstractModel.whereAnd = (sqlKeyCondition) => {
    const updatewhereAnd = sqlKeyCondition.map(type => `${type}=?`).join(', ');
    return updatewhereAnd;
};
exports.default = AbstractModel;
