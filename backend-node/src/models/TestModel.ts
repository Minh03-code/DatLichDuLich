import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class TestModel extends AbstractModel{
  constructor (){
    super();
  }
  static layTatCa = (): Promise<any> =>{
    return new Promise<any>((resolve, reject) =>{
      connection.query("SELECT * FROM test", (err: any,results: any)=>{
        if (err) {
          reject(err);
        }else {
          console.log(results);
          resolve(results);
        }
      });
      
    })
  }
}
TestModel.setTableName("test");