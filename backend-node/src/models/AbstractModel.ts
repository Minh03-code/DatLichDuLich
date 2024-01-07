// Không chỉnh sửa file này
//Nhật ký viết code nghiên cứu viết các function lấy dữ liệu, điều kiện, thêm xóa sửa, tái sử dụng cho nhiều model khác nhau giống laravel nhân ngày 02/01/2003
/*
Tạo thêm created_at và updated_at
ALTER TABLE "tên bảng"
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

*/
import { Socket } from "socket.io";
import connection from "./mysql";
export default abstract class AbstractModel {
    // protected static express = require('express');
    // protected static http = require('http');
    // protected static socketIO = require('socket.io');
    // protected static app = AbstractModel.express();
    // protected static server = AbstractModel.http.createServer(AbstractModel.app);
    // protected static io = AbstractModel.socketIO(AbstractModel.server);
    protected static tableName: string;
    // sét tên bảng cho từng model
    static setTableName(tableName: string): void {
        AbstractModel.tableName = tableName;
    }
    //////////////////////////////////////////////////////////////////////////////////
    // 1 lấy dữ liệu
    //////////////////////////////////////////////////////////////////////////////////
    // 1.1 lấy tất cả dữ liệu của bảng
    static all = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            const sql: string = `SELECT * FROM ${AbstractModel.tableName}`;
            const query = connection.query(sql, (err: any, result: any) => {
                if (err) {
                    console.log("Xuất lỗi" + err);
                    reject(err);
                } else {
                    console.log(`Lấy thành công tất cả dữ liệu trong bảng ${this.tableName}`);
                    resolve(result);
                }
            });
        });
    }
    // 1.2 lấy dữ liệu theo id
    static find = (id: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            const sql: string = `SELECT * FROM ${AbstractModel.tableName} WHERE id = ?`;
            const sqlValueCondition: Array<any> = [id];
            const query = connection.query(sql, sqlValueCondition, (err: any, result: any) => {
                if (err) {
                    console.log("Xuất lỗi" + err);
                    reject(err);
                } else {
                    console.log(`Lấy thành công item có id là ${id} trong bảng ${this.tableName}`);
                    resolve(result[0]);
                }
            });
        });
    }
    // 1.3 lấy dữ liệu theo điều kiện cụ thể (mảng điều kiện kiểu string, mảng dữ liệu điều kiện kiểu any)
    // NOTE: đây là hàm chưa được kiểm chứng nhưng khả năng đúng 100%
    static getWhereAnd = (sqlKeyCondition: Array<string>, sqlValueCondition: Array<any>): Promise<any> => {
        const getwhereAnd: string = AbstractModel.whereAnd(sqlKeyCondition);

        return new Promise((resolve, reject) => {
            const sql: string = `SELECT * FROM ${AbstractModel.tableName} WHERE ${getwhereAnd}`;
            const query = connection.query(sql, sqlValueCondition, (err: any, result: any) => {
                if (err) {
                    console.log("Xuất lỗi" + err);
                    reject(err);
                } else {
                    console.log(`Lấy thành công tất cả dữ liệu trong bảng ${this.tableName}`);
                    resolve(result);
                }
            });
        });
    }
    static getWhereOr = (sqlKeyCondition: Array<string>, sqlValueCondition: Array<any>): Promise<any> => {
        const getwhereOr: string = AbstractModel.whereOr(sqlKeyCondition);

        return new Promise((resolve, reject) => {
            const sql: string = `SELECT * FROM ${AbstractModel.tableName} WHERE ${getwhereOr}`;
            const query = connection.query(sql, sqlValueCondition, (err: any, result: any) => {
                if (err) {
                    console.log("Xuất lỗi" + err);
                    reject(err);
                } else {
                    console.log(`Lấy thành công tất cả dữ liệu trong bảng ${this.tableName}`);
                    resolve(result);
                }
            });
        });
    }
    //////////////////////////////////////////////////////////////////////////////////
    // 2 xóa dữ liệu
    //////////////////////////////////////////////////////////////////////////////////
    // 2.1 Xóa dữ liệu theo id
    static delete = (id: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            const sql: string = `DELETE FROM ${AbstractModel.tableName} WHERE id = ?`;
            const sqlValueCondition: Array<any> = [id];
            const query = connection.query(sql, sqlValueCondition, (err: any, result: any) => {
                if (err) {
                    console.log("Xuất lỗi" + err);
                    reject(err);
                } else {
                    console.log(`Xóa thành công item có id là ${id} trong bảng ${this.tableName}`);
                    resolve(result);
                }
            });
        });
    }
    // 2.2 Xóa dữ liệu theo điều kiện and
    // NOTE: đây là hàm chưa được kiểm chứng nhưng khả năng đúng 100%
    static deleteWhereAnd = (sqlKeyCondition: Array<string>, sqlValueCondition: Array<any>): Promise<any> => {
        const deleteCondition: string = AbstractModel.whereAnd(sqlKeyCondition);
        return new Promise((resolve, reject) => {
            const sql: string = `DELETE FROM ${AbstractModel.tableName} WHERE ${deleteCondition}`;
            const query = connection.query(sql, sqlValueCondition, (err: any, result: any) => {
                if (err) {
                    console.log("Xuất lỗi" + err);
                    reject(err);
                } else {
                    console.log(`Xóa thành công item trong bảng ${this.tableName} theo điều kiện`);
                    resolve(result);
                }
            });
        });
    }
    // 2.3 Xóa dữ liệu theo điều kiện or
    static deleteWhereOr = (sqlKeyCondition: Array<string>, sqlValueCondition: Array<any>): Promise<any> => {
        const deleteCondition: string = AbstractModel.whereOr(sqlKeyCondition);
        return new Promise((resolve, reject) => {
            const sql: string = `DELETE FROM ${AbstractModel.tableName} WHERE ${deleteCondition}`;
            const query = connection.query(sql, sqlValueCondition, (err: any, result: any) => {
                if (err) {
                    console.log("Xuất lỗi" + err);
                    reject(err);
                } else {
                    console.log(`Xóa thành công item trong bảng ${this.tableName} theo điều kiện`);
                    resolve(result);
                }
            });
        });
    }
    //////////////////////////////////////////////////////////////////////////////////
    // 3 thêm dữ liêu
    //////////////////////////////////////////////////////////////////////////////////
    // 3.1 Thêm dữ liệu
    static insert = (sqlKeyCreate: string, sqlValueCreate: Array<any>): Promise<any> => {
        const questionMarks: string = sqlValueCreate.map(() => '?').join(',');
        return new Promise<any>((resolve, reject) => {
            const sql = `INSERT INTO ${AbstractModel.tableName} (${sqlKeyCreate}) VALUES (${questionMarks})`;
            const query = connection.query(sql, sqlValueCreate, (err: any, result: any) => {
                if (err) {
                    console.log("Xuất lỗi" + err);
                    reject(err);
                } else {
                    console.log(`Thêm dữ liêu vào bảng ${AbstractModel.tableName} thành công`);
                    resolve(result);
                }
            });
        });
    }
    //////////////////////////////////////////////////////////////////////////////////
    // 4 Cập nhật dữ liệu
    //////////////////////////////////////////////////////////////////////////////////
    // 4.1 Cập nhật dữ liệu điều kiện and
    static updateWhereAnd = (sqlKeyUpdate: Array<string>, sqlValueUpdate: Array<any>, sqlKeyCondition: Array<string>, sqlValueCondition: Array<any>): Promise<any> => {
        const columnUpdates: string = sqlKeyUpdate.map(type => `${type}=?`).join(', '); // Ví dụ column1=?, column2=?
        const updatewhereAnd: string = AbstractModel.whereAnd(sqlKeyCondition);


        const valueQuestionMakes: Array<any> = sqlValueUpdate.concat(sqlValueCondition);
        return new Promise<any>((resolve, reject) => {
            const sql = `UPDATE ${AbstractModel.tableName} SET ${columnUpdates} WHERE ${updatewhereAnd}`;
            const query = connection.query(sql, valueQuestionMakes, (err: any, result: any) => {
                if (err) {
                    console.log("Xuất lỗi" + err);
                    reject(err);
                } else {
                    console.log(`Cập nhật dữ liêu vào bảng ${AbstractModel.tableName} thành công`);
                    resolve(result);
                }
            });
        });
    }
    // 4.2 Cập nhập dữ liệu theo điều kiện or
    static updateWhereOr = (sqlKeyUpdate: Array<string>, sqlValueUpdate: Array<any>, sqlKeyCondition: Array<string>, sqlValueCondition: Array<any>): Promise<any> => {
        const columnUpdates: string = sqlKeyUpdate.map(type => `${type}=?`).join(', '); // Ví dụ column1=?, column2=?
        const updatewhereOr: string = AbstractModel.whereOr(sqlKeyCondition);


        const valueQuestionMakes: Array<any> = sqlValueUpdate.concat(sqlValueCondition);
        return new Promise<any>((resolve, reject) => {
            const sql = `UPDATE ${AbstractModel.tableName} SET ${columnUpdates} WHERE ${updatewhereOr}`;
            const query = connection.query(sql, valueQuestionMakes, (err: any, result: any) => {
                if (err) {
                    console.log("Xuất lỗi" + err);
                    reject(err);
                } else {
                    console.log(`Cập nhật dữ liêu vào bảng ${AbstractModel.tableName} thành công`);
                    resolve(result);
                }
            });
        });
    }
    //////////////////////////////////////////////////////////////////////////////////
    // 5 Hàm hỗ trợ
    //////////////////////////////////////////////////////////////////////////////////
    // 5.1  where and
    static whereAnd = (sqlKeyCondition: Array<string>): string => {
        const updatewhereAnd: string = sqlKeyCondition.map(type => `${type}?`).join('AND ');
        return updatewhereAnd;
    }
    // 5.2 where or
    static whereOr = (sqlKeyCondition: Array<string>): string => {
        const updatewhereOr: string = sqlKeyCondition.map(type => `${type}?`).join('OR ');
        return updatewhereOr;
    }
    //////////////////////////////////////////////////////////////////////////////////
    // 6 realtime
    //////////////////////////////////////////////////////////////////////////////////
    // Lắng nghe sự kiện addData từ client
    // socket.on('addData', (newData: any) => {
    //     // Kiểm tra và sử dụng newData một cách chính xác
    //     if (newData && typeof newData === 'object') {
    //         // Thêm dữ liệu mới vào cơ sở dữ liệu
    //         db.query('INSERT INTO test (string, number) VALUES (?, ?)', [newData.string, newData.number], (err, result) => {
    //             if (err) throw err;

    //             // Gửi thông báo đến tất cả client rằng có dữ liệu mới được thêm vào
    //             io.emit('newData', newData);
    //         });
    //     }
    // });


}