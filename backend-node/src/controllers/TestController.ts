import { Request, Response } from 'express';
import { TestModel } from '../models/TestModel';
class TestController {
  static getAllTestAPI = async (req: Request, res: Response) => {
    try {
      const data = await TestModel.layTatCa();
      return res.send({
        message: "Lấy dữ liệu thành công",
        code: 200,
        result: data
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send({
        message: "Lỗi khi lấy dữ liệu",
        code: 500,
        error: error
      });
    }
  };
  static getTestByIdAPI = async (req: Request, res: Response) => {
    try {
      const data = await TestModel.find(parseInt(req.params.id));
      //const data = await TestModel.get(["id"], [parseInt(req.params.id)]); // giống y trang câu trên
      return res.send({
        message: "Lấy dữ liệu thành công",
        code: 200,
        result: data
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send({
        message: "Lỗi khi lấy dữ liệu",
        code: 500,
        error: error
      });
    }
  };
  static deleteTestByIdAPI = async (req: Request, res: Response) => {
    try {
      const data = await TestModel.delete(parseInt(req.params.id));
      return res.send({
        message: "Xóa thành công",
        code: 200,
        result: data
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send({
        message: "Lỗi khi xóa dữ liệu",
        code: 500,
        error: error
      });
    }
  };
  static createDataTestAPI = async (req: Request, res: Response) => {
    try {
      const data = await TestModel.insert("string, number", [req.body.string, req.body.number]);
      return res.send({
        message: "Thêm thành công",
        code: 200,
        result: data
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send({
        message: "Lỗi khi thêm dữ liệu",
        code: 500,
        error: error
      });
    }
  };
  static updateDataTestAPI = async (req: Request, res: Response) => {
    try {
      const data = await TestModel.updateWhereAnd(["string", "number"], [req.body.string, req.body.number], ["id"], [req.body.id]);
      return res.send({
        message: "Cập nhập thành công",
        code: 200,
        result: data
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send({
        message: "Lỗi khi cập nhập dữ liệu",
        code: 500,
        error: error
      });
    }
  };
}
export default TestController;