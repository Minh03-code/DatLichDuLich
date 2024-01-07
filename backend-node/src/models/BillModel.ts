import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class BillModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
BillModel.setTableName("bills");