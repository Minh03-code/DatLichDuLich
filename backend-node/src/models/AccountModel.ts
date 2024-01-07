import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class AccountModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
AccountModel.setTableName("accounts");