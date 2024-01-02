"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Không chỉnh sửa file này
//Nhật ký viết code nghiên cứu viết các function lấy dữ liệu, điều kiện, thêm xóa sửa, tái sử dụng cho nhiều model khác nhau giống laravel nhân ngày 02/01/2003
/*
Tạo thêm created_at và updated_at
ALTER TABLE "tên bảng"
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

*/
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
AbstractModel.get = (sqlKeyCondition, sqlValueCondition) => {
    const getWhere = _a.where(sqlKeyCondition);
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${_a.tableName} WHERE ${getWhere}`;
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
//////////////////////////////////////////////////////////////////////////////////
// 3 thêm dữ liêu
//////////////////////////////////////////////////////////////////////////////////
AbstractModel.insert = (sqlKeyCondition, sqlValueCondition) => {
    const questionMarks = sqlValueCondition.map(() => '?').join(',');
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO ${_a.tableName} (${sqlKeyCondition}) VALUES (${questionMarks})`;
        const query = mysql_1.default.query(sql, sqlValueCondition, (err, result) => {
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
AbstractModel.update = (sqlKeyUpdate, sqlValueUpdate, sqlKeyCondition, sqlValueCondition) => {
    const columnUpdates = sqlKeyUpdate.map(type => `${type}=?`).join(', '); // Ví dụ column1=?, column2=?
    const updateWhere = _a.where(sqlKeyCondition);
    const valueQuestionMakes = sqlValueUpdate.concat(sqlValueCondition);
    return new Promise((resolve, reject) => {
        const sql = `UPDATE ${_a.tableName} SET ${columnUpdates} WHERE ${updateWhere}`;
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
AbstractModel.where = (sqlKeyCondition) => {
    const updateWhere = sqlKeyCondition.map(type => `${type}=?`).join(', ');
    return updateWhere;
};
exports.default = AbstractModel;
