// Không chỉnh sửa file này
//Nhật ký viết code nghiên cứu viết các function lấy dữ liệu, điều kiện, thêm xóa sửa, tái sử dụng cho nhiều model khác nhau giống laravel nhân ngày 02/01/2003
/*
Tạo thêm created_at và updated_at
ALTER TABLE "tên bảng"
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

*/
import connection from "./mysql";
export default abstract class AbstractModel {
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
    static get = (sqlKeyCondition: Array<string>, sqlValueCondition: Array<any>): Promise<any> => {
        const getWhere: string = AbstractModel.where(sqlKeyCondition);

        return new Promise((resolve, reject) => {
            const sql: string = `SELECT * FROM ${AbstractModel.tableName} WHERE ${getWhere}`;
            const query = connection.query(sql,sqlValueCondition, (err: any, result: any) => {
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
    // 2.2 Xóa dữ liệu theo điều kiện cụ thể
    // NOTE: đây là hàm chưa được kiểm chứng nhưng khả năng đúng 100%
    static deleteCondition = (sqlKeyCondition: Array<string>, sqlValueCondition: Array<any>): Promise<any> => {
        const deleteCondition: string = AbstractModel.where(sqlKeyCondition);
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
    static insert = (sqlKeyCondition: string, sqlValueCondition: Array<any>): Promise<any> => {
        const questionMarks: string = sqlValueCondition.map(() => '?').join(',');
        return new Promise<any>((resolve, reject) => {
            const sql = `INSERT INTO ${AbstractModel.tableName} (${sqlKeyCondition}) VALUES (${questionMarks})`;
            const query = connection.query(sql, sqlValueCondition, (err: any, result: any) => {
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
    // 4.1 Cập nhật dữ liệu
    static update = (sqlKeyUpdate: Array<string>,sqlValueUpdate: Array<any>, sqlKeyCondition: Array<string>, sqlValueCondition: Array<any>): Promise<any> => {
        const columnUpdates: string = sqlKeyUpdate.map(type => `${type}=?`).join(', '); // Ví dụ column1=?, column2=?
        const updateWhere: string = AbstractModel.where(sqlKeyCondition);


        const valueQuestionMakes: Array<any> = sqlValueUpdate.concat(sqlValueCondition);
        return new Promise<any>((resolve, reject) => {
            const sql = `UPDATE ${AbstractModel.tableName} SET ${columnUpdates} WHERE ${updateWhere}`;
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
    static where = (sqlKeyCondition: Array<string>): string => {
        const updateWhere: string = sqlKeyCondition.map(type => `${type}=?`).join(', '); 
        return updateWhere;
    }


}