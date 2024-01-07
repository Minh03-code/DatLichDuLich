import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class InfoUserModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
InfoUserModel.setTableName("info_users");