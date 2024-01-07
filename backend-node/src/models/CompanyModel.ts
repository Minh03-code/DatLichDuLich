import { json } from "body-parser";
import connection from "./mysql";
import AbstractModel from "./AbstractModel";


export class CompanyModel extends AbstractModel{
  constructor (){
    super();
  }
  
}
CompanyModel.setTableName("companys");